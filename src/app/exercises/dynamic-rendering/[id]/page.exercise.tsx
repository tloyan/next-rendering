import RenderTime from '@/components/render-time'
// 🐶 Importe `getPostById` la fonction qui accède à la BDD.
// 🤖 import {getPostById} from '@/db/sgbd'

const Page = async ({params}: {params: {id: string}}) => {
  //🐶 Remplace ce tableau par l'appel à la fonction `getPostById` avec l'ID de l'article.
  const post = {id: `${params.id}`, title: 'FAKE POST'}
  // 🐶 Affiche une page 404 si l'id de post n'existe pas en BDD
  // 🤖 if (!post) notFound()

  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Dynamic Rendering Posts By ID
      </h1>
      <ul className="list-disc p-4 pl-4">
        <li key={post?.title}>
          {post?.title} (id : {post?.id})
        </li>
      </ul>
      <RenderTime />
    </div>
  )
}
export default Page
