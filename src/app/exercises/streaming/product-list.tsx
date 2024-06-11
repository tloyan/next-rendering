import {getProducts} from '@/db/sgbd'
import {ProductDetail} from './product-detail'
import RenderTime from '@/components/render-time'

export const dynamic = 'force-dynamic'
export async function ProductList() {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const products = await getProducts()
  return (
    <div className="flex flex-wrap gap-8">
      {products.map((product, index) => (
        <div key={index} className="flex-auto rounded-lg shadow-md">
          <ProductDetail product={product} />
        </div>
      ))}
      <RenderTime />
    </div>
  )
}
