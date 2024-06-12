//'use server'
import {CardComponentType} from './card'
import Client from './client'
import Server from './server'
import {ComponentTypeEnum, detectActualType} from './util'

export async function ServerWithClient() {
  const actualType = detectActualType()

  return (
    <CardComponentType
      componentType={ComponentTypeEnum.SERVER}
      actualType={actualType}
    >
      <Client>
        <Server />
      </Client>
    </CardComponentType>
  )
}
// function detectActualType() {
//   return typeof window === 'undefined'
//     ? ComponentTypeEnum.SERVER
//     : ComponentTypeEnum.CLIENT
// }
