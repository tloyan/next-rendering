import RenderTime from '@/components/render-time'
import {getPosts} from '@/db/sgbd'
import {Post} from '@/lib/type'
import {cookies, headers} from 'next/headers'

const Page = async () => {
  // const data = await fetch('https://jsonplaceholder.typicode.com/posts', {
  //   cache: 'no-store',
  // })
  // const posts = await data.json()

  const posts = await getPosts()

  const headersList = await headers()
  const userAgent = headersList.get('User-Agent')
  if (!userAgent?.includes('Chrome/126.0.0.0')) posts.length = 0

  const cookieStore = await cookies()
  const uid = cookieStore.get('userid')?.value ?? undefined
  if (!uid) posts.length = 0

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
