'use server'
import {CardComponentType} from '../../../components/card-component-type'
import Client from './client'
import Server from './server'
import {ComponentTypeEnum, detectActualType} from '../../../lib/helper'

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
