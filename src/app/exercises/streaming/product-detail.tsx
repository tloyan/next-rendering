import {Product} from '@/lib/type'
import Image from 'next/image'
export function ProductDetail({product}: {product?: Product}) {
  const imageUrl = 'https://via.placeholder.com/250x125'
  return (
    <div className="flex flex-col space-y-3">
      <div className="h-[125px] w-[250px] rounded-xl">
        <Image src={imageUrl} alt={''} width={250} height={125} />
      </div>
      <div className="space-y-2">
        <div className="text-m">{product?.title}</div>
        <div className="text-m">9,9€</div>
      </div>
    </div>
  )
}
