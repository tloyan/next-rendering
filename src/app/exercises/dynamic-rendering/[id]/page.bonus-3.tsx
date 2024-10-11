import RenderTime from '@/components/render-time'

import {getPostById, getPosts} from '@/db/sgbd'

import {Post} from '@/lib/type'
import {notFound} from 'next/navigation'
import {Metadata} from 'next/types'

export const revalidate = 10

export async function generateMetadata({
  params,
}: {
  params: {id: string}
}): Promise<Metadata> {
  const post = await getPostById(params.id)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'This post does not exist.',
    }
  }

  return {
    title: post.title, // Le titre de la page sera le titre du post
    description: post.title || 'A detailed post on a specific topic.', // Ajoute une description si disponible
    openGraph: {
      title: post.title,
      description: post.title,
      url: `https://example.com/posts/${post.id}`,
      images: [
        {
          url: post.id || '/default-image.png',
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.id,
      images: [post.id || '/default-image.png'],
    },
  }
}

export async function generateStaticParams() {
  const posts: Post[] = (await getPosts()) as Post[]
  return posts?.map((post) => ({
    id: `${post.id}`,
  }))
}
const Page = async ({params}: {params: {id: string}}) => {
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
