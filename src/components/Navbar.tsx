import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {' | '}
      <NavLink to="/products">Products</NavLink>
      {' | '}
      <NavLink to="/cart">Cart</NavLink>
      {' | '}
      {isAuthenticated ? (
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </nav>
  )
}
