import { createContext, useContext, useState, type ReactNode } from 'react'
// Context is a way to pass data through the component tree without having to pass props down manually at every level.
type AuthContextType = {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null) // createContext creates a “channel” components can subscribe to. It starts as null because the real value comes from the Provider.

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function login() {
    setIsAuthenticated(true)
  }

  function logout() {
    setIsAuthenticated(false)
  }

  // whatever you put in "value" becomes available to anything inside "children" (they have to ask for it too)
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// any component calls useAuth() to get { isAuthenticated, login, logout } without props
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider') // means you forgot to wrap your component / the app in <AuthProvider>
  }

  return context
}
