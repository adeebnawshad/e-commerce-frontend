import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type ProtectedRouteProps = { // type for the props that the ProtectedRoute component will receive
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth() // destructuring to get isAuthenticated from the useAuth hook

  if (!isAuthenticated) {
    return <Navigate to="/login" replace /> 
  }

  return children // return the children components
}