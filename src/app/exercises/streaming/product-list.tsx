import {getProducts} from '@/db/sgbd'
import {Product} from '@/lib/type'
import Image from 'next/image'
import RenderTime from '@/components/render-time'

//export const dynamic = 'force-dynamic'
export async function ProductList() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const products = await getProducts()
  return (
    <div className="flex flex-wrap gap-8">
      {products.map((product, index) => (
        <div key={index} className="flex-auto rounded-lg shadow-md">
          <ProductDetail product={product} />
        </div>
      ))}
      <RenderTime name="ProductList" />
    </div>
  )
}

export function ProductDetail({product}: {product?: Product}) {
  //https://via.placeholder.com/250x125
  const imageUrl =
    'https://images.placeholders.dev/?width=250&height=125&text=Next%20Mastery'
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
