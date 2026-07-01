import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()
  // User lands on “Order placed!” first
  // Then empty the cart (as emptying first would redirect to cart because of the guard in checkout page when items.length is 0)
  // useEffect runs after that page renders — the right place for a side effect like “clear the cart now,” not during render
  useEffect(() => {
    // runs after render is done — only clear once (ref prevents a re-render loop)
    clearCart()
  }, [clearCart]) // React’s rules (and ESLint) say: if you use a value from the component inside useEffect, put it in the deps array

  return (
    <div>
      <h1>Order placed!</h1>
      <p>Thank you for your purchase. Your order has been confirmed.</p>
      <Link to="/products">Continue shopping</Link>
    </div>
  )
}
