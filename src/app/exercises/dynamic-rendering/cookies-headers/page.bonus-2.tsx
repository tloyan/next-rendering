//2. 🚀 Fetch
import RenderTime from '@/components/render-time'
import {Post} from '@/lib/type'

const Page = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store',
  })
  const posts = await data.json()
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
