import {Separator} from '@/components/ui/separator'
import ClientComponent from './client-component'
import ServerComponent from './server-component'
//import Phases from './phases'

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-4xl font-bold">Hydration</h1>
      <ServerComponent></ServerComponent>
      <Separator className="mb-4" />

      <ClientComponent></ClientComponent>

      {/* <Separator className="mb-4" />
      <Phases /> */}
    </div>
  )
}
