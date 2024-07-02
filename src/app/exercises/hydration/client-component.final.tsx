'use client'

import {ComponentTypeEnum, detectActualType} from '@/lib/helper'
import {cn} from '@/lib/utils'

export default function ClientComponent() {
  const actualType = detectActualType()
  const date = new Date().toISOString().split('T')[0]
  const isSRR = actualType === ComponentTypeEnum.SERVER

  return (
    <div
      className={cn(isSRR ? 'bg-blue-500' : 'bg-red-500')}
      suppressHydrationWarning
    >
      <p>
        Hello
        <span> ça va ?</span>
      </p>
      {date}
    </div>
  )
}
