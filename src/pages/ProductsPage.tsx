import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import { getCategories, products } from '../data/products'

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const categories = getCategories()

  const filteredProducts = useMemo(() => { // filters the product list based on search text and category, and only recaluclates when those inputs change
    const query = search.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category // checks if the product category matches the selected category
      const matchesSearch =
        query === '' || // if the search query is empty, all products match
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)

      return matchesCategory && matchesSearch // returns true if the product matches the category and search query
    })
  }, [search, category]) // re-runs the function when the search or category changes

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
