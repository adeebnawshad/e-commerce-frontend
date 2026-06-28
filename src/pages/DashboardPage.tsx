import Card from '../components/ui/Card'

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p className="page-intro">Overview of your account activity.</p>

      <div className="card-grid">
        <Card title="Orders">
          <p className="stat">3</p>
        </Card>
        <Card title="Cart items">
          <p className="stat">0</p>
        </Card>
        <Card title="Wishlist">
          <p className="stat">5</p>
        </Card>
      </div>
    </div>
  )
}
