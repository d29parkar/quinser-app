import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-white via-primary/5 to-accent/5 border-t border-primary/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <img 
                src="/assets/logo.png" 
                alt="Quinser Pharmaceuticals" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-text-secondary mb-4 max-w-md">
              Quality, Integrity and Service. 35 years of professional expertise in the pharmaceutical sector.
            </p>
            <p className="text-sm text-text-secondary">
              CIN: U46497MH2025PTC453159
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-text mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-text-secondary hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-text-secondary hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/manufacturing" className="text-text-secondary hover:text-primary transition-colors">
                  Manufacturing
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-text-secondary hover:text-primary transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-text-secondary hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-text mb-4">Contact</h4>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li>Raigad, Maharashtra, India</li>
              <li>
                <a href="tel:+91XXXXXXXXXX" className="hover:text-primary transition-colors">
                  +91 XXXXXXXXXX
                </a>
              </li>
              <li>
                <a href="mailto:info@quinser.com" className="hover:text-primary transition-colors">
                  info@quinser.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-text-secondary">
          <p>&copy; {new Date().getFullYear()} Quinser Pharmaceuticals Private Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

