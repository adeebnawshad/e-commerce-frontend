import { Link, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import { useCart } from '../context/CartContext'
import { getProductById } from '../data/products'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const product = id ? getProductById(id) : undefined

  if (!product) {
    return (
      <div>
        <h1>Product not found</h1>
        <p>No product matches id &quot;{id}&quot;.</p>
        <Link to="/products">Back to products</Link>
      </div>
    )
  }

  return (
    <div>
      <p>
        <Link to="/products">← Back to products</Link>
      </p>
      <h1>{product.name}</h1>
      <p className="meta">{product.category}</p>
      <p className="price">${product.price.toFixed(2)}</p>
      <p>{product.description}</p>
      <Button type="button" onClick={() => addToCart(product)}>
        Add to cart
      </Button>
    </div>
  )
}
