import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProductById } from '../api/products'
import Button from '../components/ui/Button'
import { useCart } from '../context/CartContext'
import type { Product } from '../data/products'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      setNotFound(true)
      return
    }

    let cancelled = false
    const productId = id

    async function loadProduct() {
      setLoading(true)
      setNotFound(false)

      try {
        const data = await fetchProductById(productId)

        if (!cancelled) {
          setProduct(data)
        }
      } catch {
        if (!cancelled) {
          setProduct(null)
          setNotFound(true)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadProduct()

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return <p>Loading product...</p>
  }

  if (notFound || !product) {
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
