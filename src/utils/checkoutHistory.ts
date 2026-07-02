import { getUserIdFromToken } from './token'

const CHECKOUT_HISTORY_PREFIX = 'checkout-history'

type CheckoutRecord = {
  id: string
  createdAt: string
  itemCount: number
  total: number
}

function getCheckoutStorageKey(userId: number): string {
  return `${CHECKOUT_HISTORY_PREFIX}-${userId}`
}

export function addCheckoutRecord(itemCount: number, total: number): void {
  const userId = getUserIdFromToken()

  if (!userId) {
    return
  }

  const history = getCheckoutHistory()

  history.push({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    itemCount,
    total,
  })

  localStorage.setItem(getCheckoutStorageKey(userId), JSON.stringify(history))
}

export function getCheckoutHistory(): CheckoutRecord[] {
  const userId = getUserIdFromToken()

  if (!userId) {
    return []
  }

  const raw = localStorage.getItem(getCheckoutStorageKey(userId))

  if (!raw) {
    return []
  }

  try {
    return JSON.parse(raw) as CheckoutRecord[]
  } catch {
    return []
  }
}

export function getCheckoutCount(): number {
  return getCheckoutHistory().length
}
