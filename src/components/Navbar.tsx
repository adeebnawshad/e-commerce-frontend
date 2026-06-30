import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import Button from './ui/Button'

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        E-Commerce
      </NavLink>

      <div className="navbar-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart ({cartCount})</NavLink>
        {isAuthenticated && <NavLink to="/dashboard">Dashboard</NavLink>}
        {isAuthenticated ? (
          <Button type="button" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  )
}
