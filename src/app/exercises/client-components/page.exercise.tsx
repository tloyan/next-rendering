import RenderTime from '@/components/render-time'
import {getPosts} from '@/db/sgbd'

// 🐶 Importe le `RCC counter`
//import {Counter} from './rcc-counter'

export default async function Page() {
  const posts = await getPosts()
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 text-lg">
      <h1 className="mb-4 text-center text-4xl font-bold">
        Librairie externe (react-use)
      </h1>
      <h2 className="mb-4 text-center text-2xl font-bold">
        il y a {posts.length} posts
      </h2>
      {/* 🐶 Appelle ici le composant <Counter>*/}
      {/* 🐶 En cas de problème, va corriger le composant counter*/}
      <RenderTime name="Page" />
    </div>
  )
}
