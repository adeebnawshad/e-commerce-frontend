import { useState, type SubmitEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useCart } from '../context/CartContext'

export default function CheckoutPage() {
  const { items, cartTotal } = useCart()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  if (items.length === 0) { // if the cart is empty, redirect to the cart page as a guard to prevent users from accessing the checkout page if the cart is empty.
    return <Navigate to="/cart" replace />
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    // Simulate checkout API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    navigate('/checkout/success', { replace: true }) // without replace, history after checkout: /cart  →  /checkout  →  /checkout/success, with replace: true, history after checkout: /cart  →  /checkout/success (/checkout is removed from the history) // Why do we want to change the history? To prevent the user from going back to the checkout page after checkout success.
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
