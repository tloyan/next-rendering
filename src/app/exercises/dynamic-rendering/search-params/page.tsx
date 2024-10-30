import RenderTime from '@/components/render-time'
import {getPosts} from '@/db/sgbd'
import {Post} from '@/lib/type'

const Page = async (props: {
  searchParams: Promise<{[key: string]: string | string[] | undefined}>
}) => {
  const searchParams = await props.searchParams
  const posts = await getPosts()

  const filterField = searchParams?.filter as string //Champs à filrer
  const text = searchParams?.text as string //Valeur à filrer

  // Filtre les posts en fonction du `title`
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
