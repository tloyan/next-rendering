import RenderTime from '@/components/render-time'
import {getPosts} from '@/db/sgbd'

// 🐶 Importe `noStore`
// import {unstable_noStore as noStore} from 'next/cache'

// export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async () => {
  const posts = await getPosts()
  // noStore()
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Fetch Posts</h1>
      <ul className="list-disc p-4 pl-4">
        {posts?.map((post) => <li key={post.title}>{post.title}</li>)}
      </ul>
      <RenderTime />
    </div>
  )
}
export default Page
