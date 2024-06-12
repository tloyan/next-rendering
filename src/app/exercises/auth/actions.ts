'use server'

import {getUserById, updateUserRole} from '@/db/sgbd'
import {SignInError, getSession, signIn, signUp} from './auth'
import {cookies} from 'next/headers'
import {RoleEnum} from '@/lib/type'

export async function authenticate(_currentState: unknown, formData: FormData) {
  console.log('Authenticating...')
  try {
    const user = await signIn('credentials', formData)
    console.log('Signed in:', user)
    // Définir le cookie `currentUser`
    cookies().set({
      name: 'currentUser',
      value: JSON.stringify(user),
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 semaine
    })
  } catch (error) {
    const signInError = error as SignInError
    if (error) {
      switch (signInError.type) {
        case 'CredentialsSignin': {
          return 'Invalid credentials.'
        }
        default: {
          return 'Something went wrong.'
        }
      }
    }
    throw error
  }
}

export async function register(_currentState: unknown, formData: FormData) {
  console.log('register...')
  try {
    const user = await signUp('credentials', formData)
    console.log('Signed UP:', user)
    // Définir le cookie `currentUser`
    cookies().set({
      name: 'currentUser',
      value: JSON.stringify(user),
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 semaine
    })
  } catch (error) {
    console.log('register error:', error)
    const signInError = error as SignInError
    if (error) {
      switch (signInError.type) {
        case 'CredentialsSignin': {
          return 'Invalid credentials.'
        }
        default: {
          return `Something went wrong.${error}`
        }
      }
    }
    throw error
  }
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

  return {message: 'Logout successful'}
}

export async function getUserLogged() {
  const userCookie = cookies().get('currentUser')
  console.log('User cookie:', userCookie)
  if (userCookie) {
    try {
      const user = JSON.parse(userCookie.value)
      console.log('User logged:', user)
      return user
    } catch (error) {
      console.error('Failed to parse user cookie', error)
      return
    }
  }
  return
}

export async function changeRole(_currentState: unknown, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const session = await getSession()
  const user = await getUserById(session?.userId ?? '')
  console.log('changeRole session', session)
  console.log('changeRole user', user)
  if (user?.role !== RoleEnum.ADMIN) {
    return 'User is not an ADMIN'
  }
  //const userRole = session?.user?.role
  if (formData.get('role') === RoleEnum.ADMIN) {
    return 'User already has the role ADMIN'
  }
  updateUserRole(formData.get('email') as string, RoleEnum.ADMIN)
  return 'change role successful'
}
