import {getPosts} from '@/db/sgbd'
import {Post} from '@/lib/type'
import {unstable_noStore as noStore} from 'next/cache'
//https://rc.nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-functions

const Page = async () => {
  const posts = await getPosts()

  noStore()

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
