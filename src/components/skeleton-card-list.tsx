import {SkeletonCard} from './skeleton-card'

export function SkeletonCardList() {
  return (
    <div className="flex flex-wrap gap-8">
      {Array.from({length: 9}).map((_, index) => (
        <div key={index} className="flex-auto  rounded-lg shadow-md">
          <SkeletonCard />
        </div>
      ))}
    </div>
  )
}
