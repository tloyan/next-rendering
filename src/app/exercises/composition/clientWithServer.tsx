'use client'
import {CardComponentType} from '../../../components/card-component-type'
import Server from './server'
import {ComponentTypeEnum, detectActualType} from '../../../lib/helper'

export function ClientWithServer() {
  const actualType = detectActualType()

  return (
    <CardComponentType
      componentType={ComponentTypeEnum.CLIENT}
      actualType={actualType}
    >
      <Server>
        <Server />
      </Server>
    </CardComponentType>
  )
}
