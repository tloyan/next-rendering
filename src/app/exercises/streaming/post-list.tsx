import {getPosts} from '@/db/sgbd'

import RenderTime from '@/components/render-time'
import {Post} from '@/lib/type'

export async function PostList() {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  const posts = await getPosts()
  return (
    <div className="flex flex-col gap-8">
      {posts.map((post, index) => (
        <div key={index} className="flex-auto rounded-lg shadow-md">
          <PostDetail post={post} />
        </div>
      ))}
      <RenderTime name="PostList" />
    </div>
  )
}

export function PostDetail({post}: {post?: Post}) {
  return (
    <div className="flex flex-col">
      <div className="text-l">{post?.title}</div>
    </div>
  )
}
