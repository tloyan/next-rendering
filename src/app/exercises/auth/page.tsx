import {Label} from '@/components/ui/label'
import {getUserLogged} from './actions'
import LoginForm from './login-form'
import Logout from './logout'
import RegisterForm from './register-form'
import AdminForm from './admin-role-form'

export default async function Page() {
  const userLogged = await getUserLogged()
  console.log('user', userLogged?.email ?? 'no user logged')
  return (
    <div className="mx-auto max-w-2xl p-6  text-lg ">
      {!userLogged && <LoginForm></LoginForm>}
      {userLogged && (
        <>
          <Label className="text-xl">
            User connected {userLogged.email} ({userLogged.role})
          </Label>
          <Logout></Logout>
        </>
      )}
      <RegisterForm />
      <AdminForm />
    </div>
  )
}
