'use server'
import RenderTime from '@/components/render-time'
import {getProducts} from '@/db/sgbd'
import React from 'react'
import {CardComponentType} from '../composition/card'
import {ComponentTypeEnum, detectActualType} from '../composition/util'

export default async function ServerComponent({
  children,
}: {
  children?: React.ReactNode
}) {
  const actualType = detectActualType()
  const products = await getProducts()
  return (
    <CardComponentType
      componentType={ComponentTypeEnum.SERVER}
      actualType={actualType}
    >
      <h1>SERVER COMPONENT</h1>
      <p>{products.length} products</p>
      {children}
      <RenderTime name="ServerComponent"></RenderTime>
    </CardComponentType>
  )
}
