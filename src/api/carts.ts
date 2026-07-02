import type { CartItem } from '../context/CartContext'
import { getUserIdFromToken } from '../utils/token'
import api from './axios'

type CartProduct = {
  productId: number
  quantity: number
}

type FakeStoreCart = {
  id: number
  userId: number
  products: CartProduct[]
}

export async function submitCart(items: CartItem[]): Promise<FakeStoreCart> {
  const userId = getUserIdFromToken()

  if (!userId) {
    throw new Error('You must be logged in to checkout')
  }

  const { data } = await api.post<FakeStoreCart>('/carts', {
    userId,
    products: items.map((item) => ({
      productId: Number(item.id),
      quantity: item.quantity,
    })),
  })

  return data
}
