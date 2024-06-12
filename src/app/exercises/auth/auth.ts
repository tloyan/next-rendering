import {addSession, addUser, findSession, getUserByEmail} from '@/db/sgbd'
import {RoleEnum, User} from '@/lib/type'
import bcrypt from 'bcrypt'
import {randomUUID} from 'node:crypto'
import {cookies} from 'next/headers'
export interface SignInError {
  type: 'CredentialsSignin'
  message?: string
}

export const signIn = async (type: string, email: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // This is a fake function that simulates signing in with an email and password.
  // In a real app, you'd call an API here.
  if (type === 'credentials') {
    return signInCredentials(
      email.get('email') as string,
      email.get('password') as string
    )
  }
}
export const signInCredentials = async (email: string, password: string) => {
  const user = await getUserByEmail(email)

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

export const signUp = async (type: string, email: FormData) => {
  // This is a fake function that simulates signing in with an email and password.
  // In a real app, you'd call an API here.
  if (type === 'credentials') {
    return signUpCredentials(
      email.get('email') as string,
      email.get('password') as string
    )
  }
}
export const signUpCredentials = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
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
  cookies().set('currentUser', '', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1, // Expire immédiatement le cookie
  })

  cookies().set('sessionId', '', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1, // Expire immédiatement le cookie
  })

  return {message: 'Logout successful'}
}

export async function createSession(user: User) {
  const sessionId = randomUUID() //generateSessionId() // Generate a unique session ID
  cookies().set({
    name: 'sessionId',
    value: sessionId,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 semaine
  })

  await addSession({
    sessionId,
    userId: user.id,
    createdAt: new Date().toISOString(),
  })
  return sessionId
}
export async function getSession() {
  const sessionId = cookies().get('sessionId')?.value
  //const session = JSON.parse(sessionString as string)
  //console.log('getSession sessionId', session)
  // eslint-disable-next-line unicorn/no-null
  return sessionId ? await findSession(sessionId) : null
}
