import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

// Fake auth for now — flip to true to test, replace on Day 8
const isAuthenticated = false

type ProtectedRouteProps = {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
