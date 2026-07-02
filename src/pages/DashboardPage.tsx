import Card from '../components/ui/Card'
import { useCart } from '../context/CartContext'
import { getCheckoutCount } from '../utils/checkoutHistory'

export default function DashboardPage() {
  const { cartCount } = useCart()
  const orderCount = getCheckoutCount()

  return (
    <div>
      <h1>Dashboard</h1>
      <p className="page-intro">Overview of your account activity.</p>

      <div className="card-grid">
        <Card title="Orders placed">
          <p className="stat">{orderCount}</p>
        </Card>
        <Card title="Cart items">
          <p className="stat">{cartCount}</p>
        </Card>
        <Card title="Wishlist">
          <p className="stat">—</p>
        </Card>
      </div>
    </div>
  )
}
