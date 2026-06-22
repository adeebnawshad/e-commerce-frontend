import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth() // destructuring to get login from the useAuth hook
  const navigate = useNavigate()

  function handleLogin() {
    login()
    navigate('/cart')
  }

  return (
    <div>
      <h1>Login</h1>
      <button type="button" onClick={handleLogin}>
        Log in
      </button>
    </div>
  )
}
