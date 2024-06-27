import RenderTime from '@/components/render-time'
import {getPosts} from '@/db/sgbd'
import {Post} from '@/lib/type'

// 🐶 Cette page est statique par defaut
// 🐶 par rapport au exercice 3. 🚀 Search Params

// 🐶 Ajoute les props pour avoir acces à 'searchParams'
const Page = async () => {
  const posts = await getPosts()

  // 🐶 Récupere le champs à filter et la valeur grace à :

  // 🤖 const filterField = searchParams?.filter as string //champs à filrer
  // 🤖 const text = searchParams?.text as string //valeur à filrer

  // 🐶 utilise la methode 'filter'
  // 🤖 const filteredPosts = posts.filter

  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Search Posts</h1>
      <ul className="list-disc p-4 pl-4">
        {/* 🐶 remplace post par filteredPosts */}
        {posts?.map((post: Post) => <li key={post.id}>{post.title}</li>)}
      </ul>
      <RenderTime />
    </div>
  )
}
export default Page
