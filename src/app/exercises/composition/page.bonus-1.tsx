import RenderTime from '@/components/render-time'

import Server from './server'
import Client from './client'
import {ClientWithServer} from './clientWithServer'
import {ServerWithClient} from './serverWithClient'

const Page = async () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-1 p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold"> Composition</h1>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Client>
          <Server>
            <Client>
              <Server />
            </Client>
          </Server>
        </Client>

        <Server>
          <Client>
            <Server>
              <Client />
            </Server>
          </Client>
        </Server>

        <ServerWithClient />

        <ClientWithServer />
      </div>
      <RenderTime />
    </div>
  )
}
export default Page
