import RenderTime from '@/components/render-time'
import {getPosts} from '@/db/sgbd'
import {Post} from '@/lib/type'

// 🐶 Cette page est statique par défaut
// 🐶 par rapport à l'exercice 3. 🚀 Search Params

// 🐶 Ajoute les `props` pour avoir accès à `searchParams`
const Page = async () => {
  const posts = await getPosts()

  // 🐶 Récupère le champs à filter et la valeur grâce à :

  // 🤖 const filterField = searchParams?.filter as string //champs à filrer
  // 🤖 const text = searchParams?.text as string //valeur à filrer

  // 🐶 Utilise la méthode `filter`
  // 🤖 const filteredPosts = posts.filter

  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Search Posts</h1>
      <ul className="list-disc p-4 pl-4">
        {/* 🐶 Remplace `post` par `filteredPosts` */}
        {posts?.map((post: Post) => <li key={post.id}>{post.title}</li>)}
      </ul>
      <RenderTime />
    </div>
  )
}
export default Page
