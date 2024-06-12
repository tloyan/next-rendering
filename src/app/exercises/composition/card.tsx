import {PropsWithChildren} from 'react'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {cn} from '@/lib/utils'
import {ComponentTypeEnum} from './util'

type Props = PropsWithChildren<{
  componentType?: ComponentTypeEnum
  actualType?: ComponentTypeEnum
}>
export function CardComponentType({
  children,
  componentType = ComponentTypeEnum.SERVER,
  actualType = ComponentTypeEnum.CLIENT,
}: Props) {
  return (
    <Card
      suppressHydrationWarning
      className={cn(
        'w-[350px]',
        actualType === ComponentTypeEnum.SERVER ? 'bg-blue-500' : 'bg-red-500'
      )}
    >
      <CardHeader>
        <CardTitle>
          {componentType === ComponentTypeEnum.SERVER ? 'Server' : 'Client'}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
