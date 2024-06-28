//1. 🚀 Rendu Dynamique avec Headers
import RenderTime from '@/components/render-time'
import {getPosts} from '@/db/sgbd'
import {Post} from '@/lib/type'
import {headers} from 'next/headers'

const Page = async () => {
  const posts = await getPosts()

  const headersList = headers()
  const userAgent = headersList.get('User-Agent')
  console.log('User-Agent', userAgent)
  if (!userAgent?.includes('Chrome/126.0.0.0')) posts.length = 0
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
