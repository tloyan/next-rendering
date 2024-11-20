import RenderTime from '@/components/render-time'
// 🐶 Importe `getPostById` la fonction qui accède à la BDD.
import {getPostById, getPosts} from '@/db/sgbd'
import {notFound} from 'next/navigation'

export const revalidate = 10

export async function generateStaticParams() {
  const posts = await getPosts()
  return (
    posts
      // .filter(({id}) => id !== '1')
      .map(({id}) => ({
        id,
      }))
  )
}

export async function generateMetadata(props: {params: Promise<{id: string}>}) {
  const params = await props.params
  const post = await getPostById(params.id)

  return {
    title: post?.title,
  }
}

const Page = async (props: {params: Promise<{id: string}>}) => {
  // 2 secondes latency
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const params = await props.params //next 15
  //🐶 Remplace ce tableau par l'appel à la fonction `getPostById` avec l'ID de l'article.
  const post = await getPostById(params.id)
  // 🐶 Affiche une page 404 si l'id de post n'existe pas en BDD
  if (!post) notFound()

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
