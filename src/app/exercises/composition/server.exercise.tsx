import React from 'react'
import {CardComponentType} from '@/components/card-component-type'
import {ComponentTypeEnum, detectActualType} from '@/lib/helper'

export default function Server({children}: {children?: React.ReactNode}) {
  // await new Promise((resolve) => setTimeout(resolve, 100))
  const actualType = detectActualType()
  return (
    <CardComponentType
      componentType={ComponentTypeEnum.ISOMORPHIC}
      actualType={actualType}
    >
      {children}
    </CardComponentType>
  )
}
