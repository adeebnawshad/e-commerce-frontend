import { useState, type SubmitEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { submitCart } from '../api/carts'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useCart } from '../context/CartContext'
import { addCheckoutRecord } from '../utils/checkoutHistory'

export default function CheckoutPage() {
  const { items, cartTotal } = useCart()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await submitCart(items)
      addCheckoutRecord(items.length, cartTotal)
      navigate('/checkout/success', { replace: true })
    } catch {
      setError('Could not place your order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Checkout</h1>

      <section className="checkout-summary">
        <h2>Order summary</h2>
        <ul className="summary-list">
          {items.map((item) => (
            <li key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>
      </section>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Shipping details</h2>

        <Input
          id="name"
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          id="address"
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <div className="checkout-actions">
          <Link to="/cart">← Back to cart</Link>
          <Button type="submit" disabled={loading}>
            {loading ? 'Placing order...' : 'Place order'}
          </Button>
        </div>
      </form>
    </div>
  )
}
