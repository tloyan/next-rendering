'use client'

import {ComponentTypeEnum, detectActualType} from '@/lib/helper'
import {cn} from '@/lib/utils'

export default function ClientComponent() {
  const actualType = detectActualType()
  const date = new Date().toString()
  const isSRR = actualType === ComponentTypeEnum.SERVER

  return (
    <div className={cn(isSRR ? 'bg-blue-500' : 'bg-red-500')}>
      {/* 🐶 Corrige l'error d'imbrication de balises*/}
      <p>
        Hello
        <div> ça va ?</div>
      </p>
      {/* 🐶 Corrige la date en supprimant les HH MM SS
          🤖 new Date().toISOString().split('T')[0]*/}
      {date}
    </div>
  )
}
