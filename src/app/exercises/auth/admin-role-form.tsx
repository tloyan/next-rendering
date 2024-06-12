'use client'
import React from 'react'
import {useFormState as useActionState, useFormStatus} from 'react-dom'
import {changeRole} from './actions'
import {Button} from '@/components/ui/button'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Input} from '@/components/ui/input'
import {RoleEnum} from '@/lib/type'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

//import {redirect} from 'next/navigation'

export default function AdminForm() {
  const [errorMessage, changeRoleAction] = useActionState(
    changeRole,
    // eslint-disable-next-line unicorn/no-useless-undefined
    undefined
  )

  const roles = Object.keys(RoleEnum).filter((key) => Number.isNaN(Number(key)))
  return (
    <div>
      <h1 className="mb-4 text-center text-3xl font-bold">Change My Role</h1>
      <form action={changeRoleAction}>
        {/* <Input
          type="text"
          name="role"
          defaultValue={RoleEnum.ADMIN}
          placeholder="ADMIN"
          required
          className="mb-4"
        /> */}
        <div className="mb-4">
          <Select name="role">
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
