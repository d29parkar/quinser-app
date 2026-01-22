import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSubmissions: 0,
    unreadSubmissions: 0
  })
  const [loading, setLoading] = useState(true)

  const { token, logout, API_URL } = useAuth()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/api/submissions/stats/overview`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [token, API_URL])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card-bg to-background">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src="/assets/logo.png" alt="Quinser" className="h-10 w-auto" />
              <span className="text-xl font-semibold text-primary">Admin Panel</span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                target="_blank"
                className="text-text-secondary hover:text-primary transition-colors text-sm"
              >
                View Website &rarr;
              </a>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-text mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm">Total Products</p>
                <p className="text-3xl font-bold text-primary mt-1">
                  {loading ? '...' : stats.totalProducts}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm">Total Messages</p>
                <p className="text-3xl font-bold text-secondary mt-1">
                  {loading ? '...' : stats.totalSubmissions}
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">📧</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm">Unread Messages</p>
                <p className="text-3xl font-bold text-accent mt-1">
                  {loading ? '...' : stats.unreadSubmissions}
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔔</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold text-text mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/products"
            className="bg-white rounded-2xl p-6 shadow-md border border-border hover:border-primary/20 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="text-3xl">📦</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
                  Manage Products
                </h3>
                <p className="text-text-secondary text-sm">Add, edit, or remove products</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/submissions"
            className="bg-white rounded-2xl p-6 shadow-md border border-border hover:border-primary/20 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <span className="text-3xl">📧</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
                  View Messages
                </h3>
                <p className="text-text-secondary text-sm">
                  Check contact form submissions
                  {stats.unreadSubmissions > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs">
                      {stats.unreadSubmissions} new
                    </span>
                  )}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
