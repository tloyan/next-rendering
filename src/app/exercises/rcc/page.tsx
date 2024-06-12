'use client'

import {getData} from '@/lib/data'
import {Post} from '@/lib/type'
import {use, useMemo, useState} from 'react'

export default function Counter() {
  const promise = useMemo(() => getData(), [])
  const data: Post[] = use(promise)
  // console.log('data', data)
  const [message, setMessage] = useState('Combien de data y a-t-il ?')

  return (
    <div className="mx-auto max-w-2xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Client Components</h1>
      <p>{message}</p>
      <button onClick={() => setMessage(`il y a ${data.length} data`)}>
        Afficher le nombre de data
      </button>
    </div>
  )
}
