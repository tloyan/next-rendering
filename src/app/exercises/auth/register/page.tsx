import {Label} from '@/components/ui/label'

import RegisterForm from '../register-form'
import AdminForm from '../admin-role-form'
import {getConnectedUser} from '../lib/dal'

export default async function Page() {
  const userLogged = await getConnectedUser()
  console.log('user', userLogged?.email ?? 'no user logged')
  return (
    <div className="mx-auto max-w-2xl p-6  text-lg ">
      {!userLogged && <RegisterForm></RegisterForm>}
      {userLogged && (
        <>
          <Label className="text-xl">
            User connected {userLogged.email} ({userLogged.role})
          </Label>
          <AdminForm />
        </>
      )}
    </div>
  )
}
