'use client'
import RenderTime from '@/components/render-time'
import React, {useEffect, useState} from 'react'
import {CardComponentType} from '../composition/card'
import {ComponentTypeEnum, detectActualType} from '../composition/util'

//importer un RSC pour voir erreur
export default function ClientComponent({
  children,
}: {
  children?: React.ReactNode
}) {
  const actualType = detectActualType()
  const [count, setCount] = useState(0)

  //important pour expliquer la diff entre hydration et rerender
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <CardComponentType
      key={`mounted-${mounted}`}
      componentType={ComponentTypeEnum.CLIENT}
      actualType={actualType}
    >
      <h1>CLIENT COMPONENT</h1>

      <button onClick={() => setCount(count + 1)}>{count}</button>
      <RenderTime name="ClientComponent"></RenderTime>
      {children}
    </CardComponentType>
  )
}
