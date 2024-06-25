import RenderTime from '@/components/render-time'

// 🐶 Importe la fonction 'getPosts' qui permet d'acceder à notre base de donées
// 🤖 import {getPosts} from '@/db/sgbd'
import {Post} from '@/lib/type'

// 🐶 Transforme ce composant en asynchrone pour pouvoir faire l'appel en BDD.
const Page = () => {
  // ⛏️ Remplace les posts statiques par les posts de la base de données, utilise
  // 🤖 getPosts()
  const posts: Post[] = [{title: 'Un post coder dans le RSC'}]

  // 🐶 Teste le comportement en mode DEV et PRODUCTION
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold"> Fetch Posts</h1>
      <ul className="list-disc p-4 pl-4">
        {posts?.map((post: Post, idx: number) => (
          <li key={idx}>{post.title}</li>
        ))}
      </ul>

      <RenderTime />
    </div>
  )
}
export default Page
