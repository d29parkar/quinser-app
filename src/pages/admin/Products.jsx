import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({ name: '', category: '', dosage_form: '', description: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const { token, logout, API_URL } = useAuth()

  const categories = [
    'Gynaec / Infertility',
    'Surg / Uro',
    'Phy / Nephro / Cardio',
    'Orthopedics',
    'Gastroenterology'
  ]

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const url = editingProduct
        ? `${API_URL}/api/products/${editingProduct.id}`
        : `${API_URL}/api/products`

      const response = await fetch(url, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        fetchProducts()
        closeModal()
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to save product')
      }
    } catch (error) {
      setError('Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        fetchProducts()
      }
    } catch (error) {
      console.error('Failed to delete product:', error)
    }
  }

  const openAddModal = () => {
    setEditingProduct(null)
    setFormData({ name: '', category: '', dosage_form: '', description: '' })
    setError('')
    setShowModal(true)
  }

  const openEditModal = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      dosage_form: product.dosage_form || '',
      description: product.description || ''
    })
    setError('')
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingProduct(null)
    setFormData({ name: '', category: '', dosage_form: '', description: '' })
    setError('')
  }

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
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/admin" className="text-text-secondary hover:text-primary transition-colors">
            &larr; Back to Dashboard
          </Link>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text">Products</h1>
          <button
            onClick={openAddModal}
            className="px-6 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-medium hover:from-primary-dark hover:to-primary transition-all shadow-lg"
          >
            + Add Product
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-md border border-border overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-text-secondary">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center text-text-secondary">No products found</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text">Dosage Form</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-text">Description</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-text">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-text font-medium">{product.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-secondary text-sm">
                      {product.dosage_form}
                    </td>
                    <td className="px-6 py-4 text-text-secondary text-sm max-w-md truncate">
                      {product.description}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-xl font-semibold text-text">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-text mb-2">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Dosage Form</label>
                <input
                  type="text"
                  value={formData.dosage_form}
                  onChange={(e) => setFormData({ ...formData, dosage_form: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Tablet, Capsule, Syrup, Injection"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Enter product description"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 text-text-secondary hover:text-text transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-medium hover:from-primary-dark hover:to-primary transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : (editingProduct ? 'Update' : 'Add Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
