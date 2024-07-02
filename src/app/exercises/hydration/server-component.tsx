'use server'

import {ComponentTypeEnum, detectActualType} from '@/lib/helper'
import {cn} from '@/lib/utils'

export default async function ServerComponent() {
  const actualType = detectActualType()
  const date = new Date().toString()
  const isSRR = actualType === ComponentTypeEnum.SERVER
  return (
    <div className={cn(isSRR ? 'bg-blue-500' : 'bg-red-500')}>
      Server Date: {date} {actualType}
    </div>
  )
}
