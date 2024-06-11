import {SkeletonCardList} from '@/components/skeleton-card-list'

import {Suspense} from 'react'
import {ProductList} from './product-list'

import {SkeletonPostList} from '@/components/skeleton-post-list'
import {PostList} from './post-list'
import {Separator} from '@/components/ui/separator'

import RenderTime from '@/components/render-time'
//export const revalidate = 0
const Page = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold"> Products</h1>
      <Suspense fallback={<SkeletonCardList />}>
        <ProductList />
      </Suspense>
      <Separator className="my-4" />
      <h1 className="mb-4 text-center text-3xl font-bold"> Posts</h1>
      <Suspense fallback={<SkeletonPostList />}>
        <PostList />
      </Suspense>
      <RenderTime name="streaming page" />
    </div>
  )
}
export default Page
