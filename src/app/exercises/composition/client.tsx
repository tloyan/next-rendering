'use client'
import React from 'react'
import {CardComponentType} from '@/components/card-component-type'
import {ComponentTypeEnum, detectActualType} from '@/lib/helper'

export default function Client({children}: {children?: React.ReactNode}) {
  const actualType = detectActualType()
  return (
    <CardComponentType
      componentType={ComponentTypeEnum.CLIENT}
      actualType={actualType}
    >
      {children}
    </CardComponentType>
  )
}
