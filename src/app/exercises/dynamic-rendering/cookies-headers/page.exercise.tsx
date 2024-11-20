import RenderTime from '@/components/render-time'
import {getPosts} from '@/db/sgbd'
import {Post} from '@/lib/type'
import {cookies, headers} from 'next/headers'
// 🐶 Importe cookies de 'next/headers'

// 🤖 import {cookies} from 'next/headers'

const Page = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: {revalidate: 10},
  })
  const posts = await data.json()

  // const headersList = await headers()
  // console.log(headersList.get('user-agent')?.includes('Chrome/131.0.0.0'))
  // const cookieStore = await cookies()
  // console.log(cookieStore.get('userid'))
  // if (
  //   !cookieStore.get('userid') ||
  //   !headersList.get('user-agent')?.includes('Chrome/131.0.0.0')
  // ) {
  //   return <p>not authorize</p>
  // }

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
