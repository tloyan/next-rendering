import Link from 'next/link'

//https://rc.nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-functions

const Page = async () => {
  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Fetch Posts</h1>
      <ul className="list-disc p-4 pl-4">
        <li>
          <Link href="/exercises/dynamic-rendering/cookies">cookies</Link>
        </li>
        <li>
          <Link href="/exercises/dynamic-rendering/headers">headers</Link>
        </li>
        <li>
          <Link href="/exercises/dynamic-rendering/force-dynamic">
            force-dynamic
          </Link>
        </li>
        <li>
          <Link href="/exercises/dynamic-rendering/revalidate">revalidate</Link>
        </li>
        <li>
          <Link href="/exercises/dynamic-rendering/nostore">nostore</Link>
        </li>
        <li>
          <Link href="/exercises/dynamic-rendering/fetch">fetch</Link>
        </li>

        <li>
          <Link href="/exercises/dynamic-rendering/search-params??filter=type&sort=asc">
            search-params
          </Link>
        </li>
        <li>
          <Link href="/exercises/dynamic-rendering/2">dynamic routes</Link>
        </li>
      </ul>
    </div>
  )
}
export default Page
