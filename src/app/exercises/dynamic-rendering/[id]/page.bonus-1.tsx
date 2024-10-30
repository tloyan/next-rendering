import RenderTime from '@/components/render-time'

import {getPostById, getPosts} from '@/db/sgbd'

import {Post} from '@/lib/type'
import {notFound} from 'next/navigation'

export async function generateStaticParams() {
  const posts: Post[] = (await getPosts()) as Post[]
  return posts?.map((post) => ({
    id: `${post.id}`,
  }))
}
const Page = async (props: {params: Promise<{id: string}>}) => {
  const params = await props.params //next 15
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const post = await getPostById(params.id)
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
