const Manufacturing = () => {
  const capabilities = [
    {
      icon: "📊",
      title: "Market Survey-Based Development",
      description: "Comprehensive market research and consumer needs analysis drive our product development, ensuring we meet real market requirements."
    },
    {
      icon: "📦",
      title: "Product Management",
      description: "End-to-end product management from development to market launch, ensuring seamless execution and market success."
    },
    {
      icon: "📢",
      title: "Promotional Activities",
      description: "Strategic promotional campaigns and marketing initiatives to build brand awareness and drive product adoption."
    },
    {
      icon: "📈",
      title: "Sales Oversight",
      description: "Comprehensive sales management and oversight to ensure effective distribution and market penetration across regions."
    },
    {
      icon: "🚚",
      title: "Distribution Network",
      description: "Robust distribution channels and logistics management to ensure timely delivery of products to markets nationwide."
    },
    {
      icon: "🎓",
      title: "Training & Development",
      description: "Comprehensive training programs for sales teams, healthcare professionals, and partners to ensure product knowledge and compliance."
    },
    {
      icon: "💼",
      title: "Administration & Finance",
      description: "Efficient administrative support and financial management ensuring smooth operations and regulatory compliance."
    },
    {
      icon: "🌍",
      title: "WHO-GMP Certified Partners",
      description: "We partner exclusively with WHO-GMP certified manufacturers, ensuring all products meet the highest global quality standards."
    }
  ]

  const certifications = [
    { name: "WHO-GMP", description: "World Health Organization Good Manufacturing Practices" },
    { name: "ISO 9001:2015", description: "Quality Management Systems" },
    { name: "ISO 14001", description: "Environmental Management Systems" },
    { name: "ISO 45001", description: "Occupational Health and Safety Management" }
  ]

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-background via-card-bg to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">Manufacturing & Capabilities</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Excellence in pharmaceutical manufacturing with world-class facilities and certifications
          </p>
        </div>

        {/* Manufacturing Model Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-white to-primary/5 rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10">
            <h2 className="text-3xl font-bold text-text mb-6">Our Manufacturing Model</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-text mb-4">Market Survey-Based Product Development</h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Our approach is grounded in comprehensive market research and consumer needs analysis. We develop products based on thorough market surveys, ensuring that every product addresses real consumer requirements and market gaps. This data-driven methodology guides our product development from conception to launch.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text mb-4">Quality-Assured Manufacturing</h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We partner exclusively with credible businesses that hold integral quality assurance certifications and accreditations from globally recognised organisations, including <span className="font-semibold text-text">WHO-GMP</span>. This ensures that all our products are manufactured to the highest international standards, meeting rigorous quality benchmarks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text text-center mb-12">Our Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border hover:border-primary/20"
              >
                <div className="text-4xl mb-4">{capability.icon}</div>
                <h3 className="text-xl font-semibold text-text mb-3">{capability.title}</h3>
                <p className="text-text-secondary leading-relaxed">{capability.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-primary/5 via-white to-accent/5 rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10">
            <h2 className="text-3xl font-bold text-text text-center mb-6">Quality Assurance & Certifications</h2>
            <p className="text-text-secondary text-center mb-12 max-w-3xl mx-auto">
              We partner exclusively with credible businesses that hold integral quality assurance certifications and accreditations from globally recognised organisations. All our manufacturing partners are certified under <span className="font-semibold text-text">WHO-GMP</span> (World Health Organization Good Manufacturing Practices), ensuring that every product meets the highest international quality standards.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2">{cert.name}</h3>
                  <p className="text-sm text-text-secondary">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Control Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-primary/10 via-white to-accent/10 rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10">
            <h2 className="text-3xl font-bold text-text mb-6">Quality Control</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-text mb-4">Testing & Validation</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>In-process quality checks at every production stage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Comprehensive finished product testing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Stability studies and shelf-life validation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Microbiological and chemical analysis</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text mb-4">Documentation & Traceability</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Complete batch documentation and records</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Full traceability from raw materials to finished products</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Regulatory compliance documentation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Quality assurance protocols and SOPs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Product Focus Section */}
        <section>
          <div className="bg-gradient-to-br from-white to-primary/5 rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10">
            <h2 className="text-3xl font-bold text-text mb-6">Our Product Focus</h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              We are planning to launch very thoughtful products in specialized segments, each backed by scientific evidence and clinical validation:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-border hover:shadow-md hover:border-primary/30 transition-all duration-300">
                <h3 className="text-lg font-semibold text-text mb-3">Preventive Healthcare</h3>
                <p className="text-text-secondary text-sm">
                  Products designed to prevent diseases and maintain optimal health, supported by documented evidence from medical literature.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-border hover:shadow-md hover:border-primary/30 transition-all duration-300">
                <h3 className="text-lg font-semibold text-text mb-3">Health Restorative</h3>
                <p className="text-text-secondary text-sm">
                  Solutions focused on restoring and improving health, with evidence-based formulations from published medical research.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-border hover:shadow-md hover:border-primary/30 transition-all duration-300">
                <h3 className="text-lg font-semibold text-text mb-3">Infertility Management</h3>
                <p className="text-text-secondary text-sm">
                  Specialized products for infertility treatment, supported by documented and published evidence from medical textbooks and journals.
                </p>
              </div>
            </div>
            <div className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20 shadow-sm">
              <p className="text-text-secondary leading-relaxed">
                <span className="font-semibold text-text">Evidence-Based Approach:</span> All our products are well supported by documented and published evidence from medical textbooks and journals, ensuring scientific rigor and clinical validation in every formulation.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Manufacturing

