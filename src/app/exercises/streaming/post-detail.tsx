import {Post} from '@/lib/type'

export function PostDetail({post}: {post?: Post}) {
  return (
    <div className="flex flex-col">
      <div className="text-l">{post?.title}</div>
    </div>
  )
}
