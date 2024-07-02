'use client'

import {useEffect, useState} from 'react'
import clsx from 'clsx'
import {detectActualType} from '@/lib/helper'

export default function Phases() {
  const actualType = detectActualType()
  const [hydrated, setHydrated] = useState(false)

  console.log(
    `Render phase - Initial render (SSR or CSR) actualType : ${actualType} hydrated : ${hydrated}`
  )

  useEffect(() => {
    console.log(`Effect phase - useEffect is called (Client-Side Rendering) `)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      console.log('Hydration phase - Component is hydrated')
    }
  }, [hydrated])

  return (
    <div className={clsx(hydrated ? 'bg-red-500' : 'bg-blue-500')}>
      <h1 className="mb-4 text-center text-4xl font-bold">Phases </h1>
      {hydrated ? 'Client Side' : 'Server Side'}
    </div>
  )
}
