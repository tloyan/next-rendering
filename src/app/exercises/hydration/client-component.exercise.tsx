'use client'

// import {ComponentTypeEnum, detectActualType} from '@/lib/helper'
import {cn} from '@/lib/utils'
import {useEffect, useState} from 'react'

export default function ClientComponent() {
  // const actualType = detectActualType()
  const date = new Date().toString()
  // const isSRR = actualType === ComponentTypeEnum.SERVER
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return (
    <div
      suppressHydrationWarning
      className={cn(hydrated ? 'bg-red-500' : 'bg-blue-500')}
    >
      {/* 🐶 Corrige l'erreur d'imbrication de balises*/}
      <p>
        Hello
        <span> ça va ?</span>
      </p>
      {/* 🐶 Corrige la date en supprimant les `HH MM SS`
          🤖 new Date().toISOString().split('T')[0]*/}
      {date}
    </div>
  )
}
