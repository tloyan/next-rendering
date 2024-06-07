import {getPosts} from '@/db/sgbd'
import {Post} from '@/lib/type'
//import {cookies} from 'next/headers'
import {headers} from 'next/headers'
//https://rc.nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-functions

const Page = async () => {
  const posts = await getPosts()
  const headersList = headers()
  const referer = headersList.get('referer')
  console.log('referer', referer)

  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Fetch Posts</h1>
      <ul className="list-disc p-4 pl-4">
        {posts?.map((post: Post) => <li key={post.title}>{post.title}</li>)}
      </ul>
    </div>
  )
}
export default Page
