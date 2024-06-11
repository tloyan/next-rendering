import {SkeletonPost} from './skeleton-post'

export function SkeletonPostList() {
  return (
    <div className="flex  flex-wrap gap-8 ">
      {Array.from({length: 9}).map((_, index) => (
        <div key={index} className="w-full flex-auto rounded-lg shadow-md">
          <SkeletonPost />
        </div>
      ))}
    </div>
  )
}
