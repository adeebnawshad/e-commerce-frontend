import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../data/products'

export default function ProductDetailPage() {
  const { id } = useParams()
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
    </div>
  )
}
