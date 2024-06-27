import RenderTime from '@/components/render-time'
import {getPosts} from '@/db/sgbd'
import {Post} from '@/lib/type'

const Page = async ({
  searchParams,
}: {
  searchParams: {[key: string]: string | string[] | undefined}
}) => {
  const posts = await getPosts()

  const filterField = searchParams?.filter as string //champs à filrer
  const text = searchParams?.text as string //valeur à filrer

  // Filtrer les posts en fonction du 'title'
  const filteredPosts = posts.filter((post) =>
    post[filterField as keyof Post]?.toLowerCase().includes(text.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Search Posts</h1>
      <ul className="list-disc p-4 pl-4">
        {filteredPosts?.map((post: Post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <RenderTime />
    </div>
  )
}
export default Page
