import RenderTime from '@/components/render-time'
import {getPostById} from '@/db/sgbd'
import {notFound} from 'next/navigation'

const Page = async (props: {params: Promise<{id: string}>}) => {
  const params = await props.params //next 15
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
