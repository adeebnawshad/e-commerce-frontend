import type { CartItem } from '../context/CartContext'

function getCartStorageKey(userId: number | null): string {
  return userId ? `cart-${userId}` : 'cart-guest'
}

export function loadCart(userId: number | null): CartItem[] {
  const raw = localStorage.getItem(getCartStorageKey(userId))

  if (!raw) {
    return []
  }

  try {
    return JSON.parse(raw) as CartItem[]
  } catch {
    return []
  }
}

export function saveCart(userId: number | null, items: CartItem[]): void {
  localStorage.setItem(getCartStorageKey(userId), JSON.stringify(items))
}
