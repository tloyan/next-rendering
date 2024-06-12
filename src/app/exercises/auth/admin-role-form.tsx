'use client'
import React from 'react'
import {useFormState as useActionState, useFormStatus} from 'react-dom'
import {changeRole} from './actions'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'

//import {redirect} from 'next/navigation'

export default function AdminForm() {
  const [errorMessage, changeRoleAction] = useActionState(
    changeRole,
    // eslint-disable-next-line unicorn/no-useless-undefined
    undefined
  )
  return (
    <div>
      <h1 className="mb-4 text-center text-3xl font-bold">Change Role</h1>
      <form action={changeRoleAction}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="mb-4"
        />
        <Input
          type="text"
          name="role"
          placeholder="role"
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
