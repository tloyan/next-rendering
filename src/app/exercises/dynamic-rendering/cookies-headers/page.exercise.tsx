import RenderTime from '@/components/render-time'
import {getPosts} from '@/db/sgbd'
import {Post} from '@/lib/type'
// 🐶 Importe cookies de 'next/headers'

// 🤖 import {cookies} from 'next/headers'

const Page = async () => {
  const posts = await getPosts()

  // 🐶 Recupère les cookies
  // const cookieStore =  ...

  // 🐶 Récupere la valeur de 'userid' dans 'cookieStore'

  // 🐶 Si 'userid' n'est pas renseigné (pas de user), vider posts

  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Fetch Posts</h1>
      <ul className="list-disc p-4 pl-4">
        {posts?.map((post: Post) => <li key={post.title}>{post.title}</li>)}
      </ul>
      <RenderTime />
    </div>
  )
}
export default Page
