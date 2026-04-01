import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import staticProducts from '../data/products.json'
import { slugify } from '../utils/slugify'

const BASE_URL = 'https://www.quinserpharma.com'
const API_URL = import.meta.env.VITE_API_URL || 'https://quinser-backend.onrender.com'

const CATEGORY_LABELS = {
  'Surg / Uro': 'Surgical & Urology',
  'Gynaec / Infertility': 'Gynaecology & Infertility',
  'Phy / Nephro / Cardio': 'Physician, Nephrology & Cardiology',
  'Orthopedics': 'Orthopedics',
  'Gastroenterology': 'Gastroenterology',
}

const ProductDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Check static JSON first (no network needed)
    const staticMatch = staticProducts.find(p => p.slug === slug)
    if (staticMatch) {
      setProduct({ ...staticMatch, isStatic: true })
      setLoading(false)
      return
    }

    // 2. Fall back to DB products
    const fetchDbProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`)
        if (res.ok) {
          const data = await res.json()
          const match = data.find(p => slugify(p.name) === slug)
          if (match) {
            setProduct({ ...match, isStatic: false, slug })
          }
        }
      } catch {
        // Network error — product stays null → 404 state
      } finally {
        setLoading(false)
      }
    }
    fetchDbProduct()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-secondary text-lg animate-pulse">Loading…</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-text">Product not found</h1>
        <Link to="/products" className="text-primary hover:underline">← Back to Products</Link>
      </div>
    )
  }

  const imageSrc = product.image_url || (product.image ? `/images/${product.image}` : null)
  const canonicalUrl = `${BASE_URL}/products/${product.slug || slug}`
  const fullImageUrl = imageSrc
    ? (imageSrc.startsWith('http') ? imageSrc : `${BASE_URL}${imageSrc}`)
    : `${BASE_URL}/assets/logo.png`
  const categoryLabel = CATEGORY_LABELS[product.category] || product.category
  const metaDescription = `${product.name} by Quinser Pharmaceuticals — ${categoryLabel}. ${product.description?.replace(/\n+/g, ' ').slice(0, 140)}`

  // JSON-LD Product schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description?.replace(/\n+/g, ' '),
    image: fullImageUrl,
    url: canonicalUrl,
    brand: {
      '@type': 'Brand',
      name: 'Quinser Pharmaceuticals',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Quinser Pharmaceuticals Private Limited',
      url: BASE_URL,
    },
    category: categoryLabel,
  }

  // Breadcrumb JSON-LD
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE_URL}/products` },
      { '@type': 'ListItem', position: 3, name: product.name, item: canonicalUrl },
    ],
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | Quinser Pharmaceuticals</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${product.name} | Quinser Pharmaceuticals`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="twitter:title" content={`${product.name} | Quinser Pharmaceuticals`} />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:image" content={fullImageUrl} />
      </Helmet>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen py-12 bg-gradient-to-b from-background via-card-bg to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb nav */}
          <nav className="mb-8 text-sm text-text-secondary flex items-center gap-2" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
            <span>/</span>
            <span className="text-text font-medium">{product.name}</span>
          </nav>

          <div className="bg-white rounded-2xl shadow-md border border-border overflow-hidden">
            {/* Product image */}
            {imageSrc && (
              <div className="w-full bg-gray-50 flex items-center justify-center p-8 border-b border-border">
                <img
                  src={imageSrc}
                  alt={`${product.name} — ${categoryLabel}`}
                  className="max-h-72 w-auto object-contain"
                  onError={(e) => { e.currentTarget.parentElement.style.display = 'none' }}
                />
              </div>
            )}

            <div className="p-8 md:p-12">
              {/* Category */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-sm font-semibold rounded-full border border-primary/20">
                  {categoryLabel}
                </span>
              </div>

              {/* Product name — h1 for SEO */}
              <h1 className="text-3xl md:text-4xl font-bold text-text mb-6">{product.name}</h1>

              {/* Composition / description */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-text mb-3">Composition</h2>
                <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Manufacturer info */}
              <div className="bg-gray-50 rounded-xl p-6 border border-border">
                <p className="text-sm text-text-secondary">
                  <span className="font-semibold text-text">Marketed by:</span>{' '}
                  Quinser Pharmaceuticals Private Limited, Navi Mumbai, Maharashtra, India
                </p>
                <p className="text-sm text-text-secondary mt-1">
                  <span className="font-semibold text-text">Category:</span>{' '}
                  {categoryLabel}
                </p>
              </div>

              {/* Back link */}
              <div className="mt-8">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  ← Back to All Products
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default ProductDetail
