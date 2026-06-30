import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart()

  if (items.length === 0) {
    return (
      <div>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products">Browse products</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Cart</h1>

      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <div>
              <h2>{item.name}</h2>
              <p className="price">${item.price.toFixed(2)}</p>
            </div>

            <div className="cart-controls">
              <Button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </Button>
              <span>{item.quantity}</span>
              <Button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </Button>
              <Button type="button" onClick={() => removeFromCart(item.id)}>
                Remove
              </Button>
            </div>

            <p className="cart-line-total">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>
    </div>
  )
}
