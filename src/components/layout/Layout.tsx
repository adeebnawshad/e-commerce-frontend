import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'

export default function Layout() {
  return (
    <div className="app">
      <Navbar /> {/* Navbar component */}
      <main className="main">
        <Outlet /> {/* page content swaps here */}
      </main>
    </div>
  )
}

/**
 * Navbar — stays on screen while you navigate
 * <Outlet /> — placeholder where the current route’s page goes (HomePage, ProductsPage, etc.)
 */