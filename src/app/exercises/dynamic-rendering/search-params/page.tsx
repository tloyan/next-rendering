import {getPosts} from '@/db/sgbd'
import {Post} from '@/lib/type'

//https://rc.nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-functions

const Page = async ({
  params,
  searchParams,
}: {
  params: {slug: string}
  searchParams: {[key: string]: string | string[] | undefined}
}) => {
  const posts = await getPosts()
  console.log('params', params)
  console.log('searchParams', searchParams)
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Fetch Posts</h1>
      <ul className="list-disc p-4 pl-4">
        {posts?.map((post: Post) => <li key={post.id}>{post.title}</li>)}
      </ul>
    </div>
  )
}
export default Page
