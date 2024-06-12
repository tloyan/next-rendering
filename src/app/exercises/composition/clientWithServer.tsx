'use client'
import {CardComponentType} from './card'
import Client from './client'
import Server from './server'
import {ComponentTypeEnum, detectActualType} from './util'

export function ClientWithServer() {
  const actualType = detectActualType()

  return (
    <CardComponentType
      componentType={ComponentTypeEnum.CLIENT}
      actualType={actualType}
    >
      <Server>
        <Client />
      </Server>
    </CardComponentType>
  )
}
// function detectActualType() {
//   return typeof window === 'undefined'
//     ? ComponentTypeEnum.SERVER
//     : ComponentTypeEnum.CLIENT
// }
