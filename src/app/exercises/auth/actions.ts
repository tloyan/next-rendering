'use server'

import {updateUserRole} from '@/db/sgbd'
import auth from './lib/auth'
import {RoleEnum} from '@/lib/type'
import {revalidatePath} from 'next/cache'
import {SignInError} from './lib/type'
import {getConnectedUser} from './lib/dal'

export async function authenticate(_currentState: unknown, formData: FormData) {
  console.log('authenticate...')
  try {
    const user = await auth.signIn(
      formData.get('email') as string,
      formData.get('password') as string
    )
    console.log('Signed in:', user)
    // Définir le cookie `currentUser`
  } catch (error) {
    console.error('authenticate error:', error)
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
    const user = await auth.signUp(
      formData.get('email') as string,
      formData.get('password') as string
    )
    console.log('Signed UP:', user)
    // Définir le cookie `currentUser`
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
  revalidatePath('/exercises/auth')
}

export async function logout() {
  auth.logout()
}

export async function getUserLogged() {
  //return await getUserFromCookiesSession()
}

export async function changeRole(_currentState: unknown, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const user = await getConnectedUser()
  if (!user) {
    return 'vous etes pas connecté'
  }
  if (user?.role !== RoleEnum.ADMIN) {
    return 'User is not an ADMIN'
  }
  //const userRole = sesxsion?.user?.role
  if (formData.get('role') === RoleEnum.ADMIN) {
    return 'User already has the role ADMIN'
  }
  updateUserRole(user.email, formData.get('role') as RoleEnum)
  revalidatePath('/exercises/auth')
  return 'change role successful'
}
