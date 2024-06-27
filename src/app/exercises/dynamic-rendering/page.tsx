import Link from 'next/link'

const Page = async () => {
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Dynamic Rendering</h1>
      <ul className="list-disc p-4 pl-4">
        <li>
          <Link href="/exercises/dynamic-rendering/1">dynamic routes (1)</Link>
        </li>
        <li>
          <Link href="/exercises/dynamic-rendering/search-params?filter=title&text=a">
            search-params
          </Link>
        </li>
      </ul>
    </div>
  )
}
export default Page
