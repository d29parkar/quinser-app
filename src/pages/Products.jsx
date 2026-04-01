import { useState, useEffect } from 'react'
import staticProducts from '../data/products.json'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [dbProducts, setDbProducts] = useState([])
  const [dbLoading, setDbLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL || 'https://quinser-backend.onrender.com'

  useEffect(() => {
    fetchDbProducts()
  }, [])

  const fetchDbProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`)
      if (response.ok) {
        const data = await response.json()
        setDbProducts(data)
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setDbLoading(false)
    }
  }

  // Merge static products first, then any DB-only products.
  // Static products use string IDs (e.g. "static-24"); DB products use numeric IDs.
  const allProducts = [...staticProducts, ...dbProducts]

  const categories = ['All', ...new Set(allProducts.map(p => p.category))]

  const filteredProducts = selectedCategory === 'All'
    ? allProducts
    : allProducts.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-background via-card-bg to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">Our Products</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Comprehensive range of pharmaceutical products manufactured to the highest quality standards
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg'
                  : 'bg-white text-text-secondary hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:text-primary border border-border hover:border-primary/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {dbLoading && dbProducts.length === 0 ? (
          // Show static products immediately; show a subtle spinner while DB loads
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staticProducts
                .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <p className="text-center text-text-secondary text-sm mt-8 animate-pulse">Loading more products…</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-secondary text-lg">No products found in this category.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const ProductCard = ({ product }) => {
  // Static products have an `image` field (filename), DB products have `image_url` (full URL).
  const imageSrc = product.image_url || (product.image ? `/images/${product.image}` : null)

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border hover:border-primary/20 overflow-hidden flex flex-col">
      {imageSrc && (
        <div className="h-48 w-full overflow-hidden bg-gray-50 flex items-center justify-center">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-contain p-2"
            onError={(e) => { e.currentTarget.parentElement.style.display = 'none' }}
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
            {product.category}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-text mb-3">{product.name}</h3>
        <p className="text-text-secondary leading-relaxed text-sm flex-grow">{product.description}</p>
      </div>
    </div>
  )
}

export default Products
