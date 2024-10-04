import RenderTime from '@/components/render-time'
// 🐶 Importe les composants Server et Client
// import Server from './server'
// import Client from './client'

// 🐶 Importe les composants `ServerWithClient` (qui inclus un client)
// et `ClientWithServer` (qui inclus un serveur)
// import {ClientWithServer} from './clientWithServer'
// import {ServerWithClient} from './serverWithClient'

const Page = async () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-1 p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold"> Composition</h1>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {/* 🐶 Fais la composition suivante (props children) */}
        {/* 
        <Client>
          <Server>
            <Client>
              <Server />
            </Client>
          </Server>
        </Client> 
        */}

        {/* 🐶 Fais la composition inverse (props children) */}
        {/* Server -> Client -> Server -> Client */}

        {/* 🐶 Utilise <ServerWithClient /> */}

        {/* 🐶 Utilise <ClientWithServer /> */}
      </div>
      <RenderTime />
    </div>
  )
}
export default Page
