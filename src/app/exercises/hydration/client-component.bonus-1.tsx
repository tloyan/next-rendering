//1. 🚀 Render après hydration
'use client'

import {cn} from '@/lib/utils'
import {useEffect, useState} from 'react'

export default function ClientComponent() {
  const date = new Date().toString()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return (
    <div className={cn(hydrated ? 'bg-red-500' : 'bg-blue-500')}>
      {hydrated ? `${date}` : 'Loading...'}
    </div>
  )
}
