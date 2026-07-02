import type { Product } from '../data/products'
import api from './axios'

type FakeStoreProduct = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

function toProduct(product: FakeStoreProduct): Product {
  return {
    id: String(product.id),
    name: product.title,
    price: product.price,
    category: product.category,
    description: product.description,
  }
}

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await api.get<FakeStoreProduct[]>('/products')
  return data.map(toProduct) // .map() is for multiple objects, not just one.
}

export async function fetchProductById(id: string): Promise<Product> {
  const { data } = await api.get<FakeStoreProduct>(`/products/${id}`)
  return toProduct(data) // just one object, so no .map()
}
