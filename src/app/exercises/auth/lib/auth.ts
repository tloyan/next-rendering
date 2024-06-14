import {
  addSession,
  addUser,
  findSession,
  getUserByEmail,
  getUserById,
} from '@/db/sgbd'
import {AuthSession, RoleEnum, SessionType, User} from '@/lib/type'
import bcrypt from 'bcrypt'
import {randomUUID} from 'node:crypto'
import {cookies} from 'next/headers'

export interface SignInError {
  type: 'CredentialsSignin'
  message?: string
}

export const COOKIE_SESSION = 'session'
export const COOKIE_SESSION_ID = 'sessionId'
export const SESSION_TYPE: SessionType = SessionType.COOKIES

export const signIn = async (type: string, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  if (type !== 'credentials') {
    throw new Error('only credentials are supported for now.')
  }
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const user = await getUserByEmail(email)
  console.log('Auth : signIn ...', email, password, user)
  if (!user) {
    // eslint-disable-next-line no-throw-literal
    throw {
      type: 'CredentialsSignin',
      message: 'Invalid User.',
    } as SignInError
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    // eslint-disable-next-line no-throw-literal
    throw {
      type: 'CredentialsSignin',
      message: 'Invalid credentials.',
    } as SignInError
  }
  await createSession(user)
  return {email: user.email, role: user.role}
}

export const signUp = async (type: string, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  if (type !== 'credentials') {
    throw new Error('only credentials are supported for now.')
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const user = await getUserByEmail(email)
  if (user) {
    throw new Error('User already exists')
  }
  console.log('Signing up...', email, password)
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)

  // Hachage du mot de passe avec le salt
  const hashedPassword = await bcrypt.hash(password, salt)
  const newUser = {
    email,
    password: hashedPassword,
    name: 'John Doe',
    role: RoleEnum.USER,
  }
  const createdUser = await addUser(newUser)
  await createSession(createdUser)
  return {email: newUser.email, role: newUser.role}
}

export async function logout() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // Supprimer le cookie `currentUser`
  cookies().set(COOKIE_SESSION, '', {expires: new Date(0)})
  cookies().set('sessionId', '', {expires: new Date(0)})

  return {message: 'Logout successful'}
}

// create a session
export async function createSession(user: User) {
  switch (SESSION_TYPE) {
    case SessionType.COOKIES: {
      return createCookiesSession(user)
    }
    case SessionType.DATABASE: {
      return createDatabaseSession(user)
    }
    default: {
      throw new Error('Invalid session type')
    }
  }
}

export async function createCookiesSession(user: User) {
  const expires = new Date(Date.now() + 3600 * 1000) // 1h
  const session = JSON.stringify({user, expires}) //todo crypter
  cookies().set(COOKIE_SESSION, session, {expires, httpOnly: true})
}

export async function createDatabaseSession(user: User) {
  const sessionId = randomUUID() //generateSessionId() // Generate a unique session ID
  const expires = new Date(Date.now() + 3600 * 1000) // 1h
  cookies().set(COOKIE_SESSION_ID, sessionId, {expires, httpOnly: true})
  await addSession({
    sessionId,
    userId: user.id,
    createdAt: new Date().toISOString(),
  })
  return sessionId
}

export async function getSession() {
  switch (SESSION_TYPE) {
    case SessionType.COOKIES: {
      return getUserFromCookiesSession()
    }
    case SessionType.DATABASE: {
      return getUserFromDatabaseSession()
    }
    default: {
      throw new Error('Invalid session type')
    }
  }
}

export async function getUserFromDatabaseSession() {
  const sessionId = cookies().get(COOKIE_SESSION_ID)?.value
  //const session = JSON.parse(sessionString as string)
  //console.log('getSession sessionId', session)

  const session = await findSession(sessionId ?? '')
  const user = await getUserById(session?.userId ?? '')
  return user
}

export async function getUserFromCookiesSession() {
  const userCookie = cookies().get(COOKIE_SESSION)
  console.log('User cookie:', userCookie)
  if (userCookie && userCookie.value) {
    try {
      const authSession: AuthSession = JSON.parse(userCookie.value)
      const dbUser = await getUserByEmail(authSession.user.email) //todo react cache
      console.log('User logged:', dbUser)
      return dbUser
    } catch (error) {
      console.error('Failed to parse user cookie', error)
      return
    }
  }
  return
}
