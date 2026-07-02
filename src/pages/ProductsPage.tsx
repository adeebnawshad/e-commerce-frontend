import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../api/products'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import type { Product } from '../data/products'
import { getCategories } from '../data/products'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  useEffect(() => {
    let cancelled = false

    async function loadProducts() {
      setLoading(true)
      setError('')

      try {
        const data = await fetchProducts()

        if (!cancelled) {
          setProducts(data)
        }
      } catch {
        if (!cancelled) {
          setError('Could not load products. Please try again.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      cancelled = true
    }
  }, [])

  const categories = getCategories(products)

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory =
        category === 'all' || product.category === category
      const matchesSearch =
        query === '' ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [products, search, category])

  if (loading) {
    return (
      <div>
        <h1>Products</h1>
        <p>Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h1>Products</h1>
        <p className="error">{error}</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Products</h1>
      <p className="page-intro">Browse, search, and filter our catalog.</p>

      <div className="filters">
        <Input
          id="search"
          label="Search"
          type="search"
          placeholder="Search by name or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products match your search.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <Card key={product.id} title={product.name}>
              <p className="meta">{product.category}</p>
              <p className="price">${product.price.toFixed(2)}</p>
              <Link to={`/products/${product.id}`}>View details</Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
