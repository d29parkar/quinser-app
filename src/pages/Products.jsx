import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { slugify } from '../utils/slugify'

const BASE_URL = 'https://www.quinserpharma.com'
const API_URL = import.meta.env.VITE_API_URL || 'https://quinser-backend.onrender.com'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
    fetchProducts()
  }, [])

  const categories = ['All', ...new Set(products.map(p => p.category))]
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory)

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Quinser Pharmaceuticals Product Range',
    description: 'Pharmaceutical products by Quinser Pharmaceuticals Private Limited across Surgical & Urology, Gynaecology & Infertility, Orthopedics, Cardiology, and Nephrology segments.',
    url: `${BASE_URL}/products`,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE_URL}/products/${p.slug || slugify(p.name)}`,
      name: p.name,
    })),
  }

  return (
    <>
      <Helmet>
        <title>Products | Quinser Pharmaceuticals — Pharma Range India</title>
        <meta
          name="description"
          content="Explore Quinser Pharmaceuticals' complete product range — surgical, urology, gynaecology, infertility, cardiology, nephrology, and orthopedics medicines. WHO-GMP certified. Navi Mumbai, India."
        />
        <link rel="canonical" href={`${BASE_URL}/products`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Products | Quinser Pharmaceuticals — Pharma Range India" />
        <meta
          property="og:description"
          content="Explore Quinser Pharmaceuticals' complete product range — surgical, urology, gynaecology, infertility, cardiology, nephrology, and orthopedics medicines. WHO-GMP certified. Navi Mumbai, India."
        />
        <meta property="og:url" content={`${BASE_URL}/products`} />
        <meta property="og:image" content={`${BASE_URL}/assets/logo.png`} />
        <meta property="twitter:title" content="Products | Quinser Pharmaceuticals — Pharma Range India" />
        <meta
          property="twitter:description"
          content="Explore Quinser Pharmaceuticals' complete product range — surgical, urology, gynaecology, infertility, cardiology, nephrology, and orthopedics medicines. WHO-GMP certified. Navi Mumbai, India."
        />
        <meta property="twitter:url" content={`${BASE_URL}/products`} />
      </Helmet>

      {/* ItemList structured data — emitted only once products are loaded */}
      {!loading && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}

      <div className="min-h-screen py-12 bg-gradient-to-b from-background via-card-bg to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">Our Products</h1>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Quinser Pharmaceuticals offers a comprehensive range of WHO-GMP certified pharmaceutical
              products across Surgical &amp; Urology, Gynaecology &amp; Infertility, Physician /
              Nephrology / Cardiology, and Orthopedics segments — crafted with precision in Navi Mumbai, India.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <p className="text-text-secondary text-lg animate-pulse">Loading products…</p>
            </div>
          ) : (
            <>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
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
    </>
  )
}

const ProductCard = ({ product }) => {
  const imageSrc = product.image_url || (product.image ? `/images/${product.image}` : null)
  const productSlug = product.slug || slugify(product.name)

  return (
    <Link
      to={`/products/${productSlug}`}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border hover:border-primary/20 overflow-hidden flex flex-col group"
    >
      {imageSrc && (
        <div className="h-48 w-full overflow-hidden bg-gray-50 flex items-center justify-center">
          <img
            src={imageSrc}
            alt={`${product.name} pharmaceutical product`}
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
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
        <h2 className="text-xl font-semibold text-text mb-3 group-hover:text-primary transition-colors">{product.name}</h2>
        <p className="text-text-secondary leading-relaxed text-sm flex-grow line-clamp-3">{product.description}</p>
        <p className="text-primary text-sm font-medium mt-4">View details →</p>
      </div>
    </Link>
  )
}

export default Products
