import {Label} from '@/components/ui/label'

import Logout from './logout/logout'
import {getConnectedUser} from './lib/dal'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import ChangeRoleForm from './role/change-role-form'
import {RoleEnum} from '@/lib/type'
import AdminChangeRoleForm from './role/admin-role-form'

export default async function Page() {
  const userLogged = await getConnectedUser()
  console.log('user', userLogged?.email ?? 'no user logged')
  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6 text-center text-lg">
      {!userLogged && <Label> You are not connected</Label>}
      <div>
        {!userLogged && (
          <div className="space-x-1">
            <Button>
              <Link href="/exercises/auth/login"> Login</Link>
            </Button>
            <Button>
              <Link href="/exercises/auth/register"> Register</Link>
            </Button>
          </div>
        )}
      </div>
      {userLogged && (
        <>
          <Label className="text-xl">
            User connected {userLogged.email} ({userLogged.role})
          </Label>
          <Logout user={userLogged}></Logout>
          <ChangeRoleForm />
          {(userLogged.role === RoleEnum.ADMIN ||
            userLogged.role === RoleEnum.SUPER_ADMIN) && (
            <AdminChangeRoleForm />
          )}
        </>
      )}
    </div>
  )
}
