const TOKEN_KEY = 'token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function getUserIdFromToken(): number | null {
  const token = getToken()

  if (!token) {
    return null
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as { sub?: number }
    const userId = payload.sub

    if (typeof userId !== 'number' || Number.isNaN(userId)) {
      return null
    }

    return userId
  } catch {
    return null
  }
}
