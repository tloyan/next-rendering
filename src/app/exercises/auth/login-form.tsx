'use client'
import React from 'react'
import {useFormState as useActionState, useFormStatus} from 'react-dom'
import {authenticate} from './actions'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
//import {redirect} from 'next/navigation'

export default function LoginForm() {
  // Logic to determine if a redirect is needed
  // const accessDenied = true
  // if (accessDenied) {
  //   redirect('/login')
  // }
  const [errorMessage, authenticateAction] = useActionState(
    authenticate,
    // eslint-disable-next-line unicorn/no-useless-undefined
    undefined
  )
  return (
    <div>
      <h1 className="mb-4 text-center text-3xl font-bold">Login</h1>
      <form action={authenticateAction}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="mb-4"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="mb-4"
        />

        <div className="text-red-500">
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <LoginButton />
      </form>
    </div>
  )
}
function LoginButton() {
  const {pending} = useFormStatus()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (pending) {
      event.preventDefault()
    }
  }

  return (
    <Button disabled={pending} type="submit" onClick={handleClick}>
      Login
    </Button>
  )
}
