export type Product = {
  id: string
  name: string
  price: number
  category: string
  description: string
}

export function getCategories(products: Product[]): string[] {
  return [...new Set(products.map((product) => product.category))]
}
