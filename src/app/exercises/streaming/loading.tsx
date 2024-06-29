import {Skeleton} from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="m-4 mx-auto max-w-4xl p-6 text-lg">
      <Skeleton className="m-4  h-[325px] rounded-xl" />
      <div className="m-4 space-y-2">
        <Skeleton className="h-4" />
        <Skeleton className="h-4 " />
      </div>
    </div>
  )
}
