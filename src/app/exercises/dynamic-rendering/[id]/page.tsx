//https://rc.nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-functions

import {getPostById, getPosts} from '@/db/sgbd'
import {Post} from '@/lib/type'
import {notFound} from 'next/navigation'

//export const dynamic = 'force-dynamic'
export const revalidate = 20
export async function generateStaticParams() {
  // const data = await fetch('https://jsonplaceholder.typicode.com/posts')
  // const posts: Post[] = await data.json()
  // //console.log('posts', posts)
  // return posts.map((post) => ({
  //   id: `${post.id}`,
  // }))

  const posts: Post[] = (await getPosts()) as Post[]
  //console.log('posts', posts)
  return posts?.map((post) => ({
    id: `${post.id}`,
  }))
}
const Page = async ({params}: {params: {id: string}}) => {
  // const data = await fetch(
  //   `https://jsonplaceholder.typicode.com/posts/${params.id}`
  // )
  // const post = await data.json()

  const post = await getPostById(params.id)
  if (!post) notFound()
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Fetch Posts</h1>
      <ul className="list-disc p-4 pl-4">
        <li key={post?.title}>
          {post?.title} (id : {post?.id})
        </li>
      </ul>
    </div>
  )
}
export default Page
