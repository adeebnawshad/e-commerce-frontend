export type Product = {
  id: string
  name: string
  price: number
  category: string
  description: string
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 79.99,
    category: 'Electronics',
    description: 'Noise-cancelling over-ear headphones with 30-hour battery life.',
  },
  {
    id: '2',
    name: 'Running Shoes',
    price: 59.99,
    category: 'Footwear',
    description: 'Lightweight shoes designed for daily runs and gym sessions.',
  },
  {
    id: '3',
    name: 'Coffee Maker',
    price: 49.99,
    category: 'Home',
    description: 'Programmable drip coffee maker with reusable filter.',
  },
  {
    id: '4',
    name: 'Backpack',
    price: 39.99,
    category: 'Accessories',
    description: 'Water-resistant backpack with padded laptop sleeve.',
  },
  {
    id: '5',
    name: 'Bluetooth Speaker',
    price: 34.99,
    category: 'Electronics',
    description: 'Portable speaker with deep bass and 12-hour playtime.',
  },
  {
    id: '6',
    name: 'Yoga Mat',
    price: 24.99,
    category: 'Accessories',
    description: 'Non-slip mat with extra cushioning for floor workouts.',
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getCategories(): string[] {
  return [...new Set(products.map((product) => product.category))]
}
