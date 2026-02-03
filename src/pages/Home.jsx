import { Link } from 'react-router-dom'

const Home = () => {
  const founders = [
    {
      name: "Ramkumar Kooliyadath",
      designation: "Director",
      location: "India",
      bio: "With over three decades of experience in the pharmaceutical industry, Ramkumar brings deep expertise in business development and operations. Starting his career as a medical representative, he progressed through various roles, gaining comprehensive knowledge of the pharmaceutical market. He has extensive experience in sales management and distribution networks across multiple regions. His strategic vision and commitment to quality have been instrumental in establishing Quinser's foundation."
    },
    {
      name: "Kiran Sudhakar Pimparkar",
      designation: "Director",
      location: "India",
      bio: "Kiran has been in the pharmaceutical industry for 25 years. He started his career as a medical representative, climbing to the position of area development manager. He then started his own wholesale business, active in Maharashtra state of India. He brings extensive experience in marketing and distribution with a deep understanding of regional market dynamics and customer needs."
    },
    {
      name: "Vishwanath Ananda Patil",
      designation: "Director",
      location: "India",
      bio: "Vishwanath brings over 20 years of pharmaceutical industry experience, having worked across various segments from field sales to distribution management. His journey began as a medical representative, where he developed strong relationships with healthcare professionals. He progressed to regional management roles, overseeing sales operations across multiple territories. His expertise in supply chain management and market penetration strategies has been crucial in expanding Quinser's reach."
    },
    {
      name: "Ajay Katare",
      designation: "Director",
      location: "India",
      bio: "With a career spanning more than 22 years in pharmaceuticals, Ajay has built a strong foundation in sales, marketing, and business operations. Beginning as a medical representative, his exceptional performance led him to management positions where he oversaw multiple districts. He has extensive experience in building distribution networks and managing key accounts. His focus on quality assurance and regulatory compliance ensures Quinser maintains the highest industry standards."
    },
    {
      name: "Shakuntala Devi",
      designation: "Director",
      location: "India",
      bio: "Shakuntala brings over 20 years of pharmaceutical industry expertise, with a strong background in sales and business development. Her career progression from medical representative to senior management roles has given her comprehensive insights into market dynamics and customer relationships. She has managed extensive sales territories and distribution networks, building strong partnerships across the pharmaceutical value chain. Her commitment to excellence and patient-centric approach drives Quinser's mission forward."
    },
    {
      name: "Chidanand Umesh Rajmane",
      designation: "Director",
      location: "India",
      bio: "Chidanand has dedicated over 23 years to the pharmaceutical industry, starting as a medical representative and advancing through various leadership roles. His experience includes managing large sales teams, developing market strategies, and establishing robust distribution channels across multiple regions. He has a proven track record in business growth and operational excellence. His expertise in quality management and regulatory affairs ensures Quinser's products meet international standards."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/[0.04] to-background py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-10 flex justify-center">
              <img
                src="/assets/logo.png"
                alt="Quinser Pharmaceuticals Private Limited"
                className="h-28 md:h-36 w-auto"
                style={{
                  mixBlendMode: 'multiply',
                  filter: 'brightness(1.1) contrast(1.15)',
                  backgroundColor: 'transparent'
                }}
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent pb-2 leading-tight">
              Quality-Integrity-Service
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              35 years of professional expertise in the pharmaceutical sector led to the formation of <span className="font-semibold text-gray-700">QUINSER Pharmaceuticals Private Limited</span>, a Mumbai-based pharma venture rooted in the founding principles of "<span className="font-semibold text-gray-700">QUALITY</span>-<span className="font-semibold text-gray-700">INTEGRITY</span>-<span className="font-semibold text-gray-700">SERVICE</span>", where Passion Meets Purpose.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Explore Products
              </Link>
              <Link
                to="/manufacturing"
                className="px-8 py-3 bg-white text-primary border border-primary/30 rounded-lg font-medium hover:border-primary/60 hover:bg-primary/[0.02] transition-colors duration-200 shadow-sm"
              >
                Our Capabilities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-gray-900">About Quinser</h2>
          <div className="space-y-6">
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Our company's name <span className="font-semibold text-gray-800">QUINSER</span> aptly describes our ethos and underscores our commitment to the core values: <span className="font-semibold">Quality</span>, <span className="font-semibold">Integrity</span>, and <span className="font-semibold">Service</span>. 35 years of professional expertise in the pharmaceutical sector led to the formation of <span className="font-semibold text-gray-800">Quinser Pharmaceuticals Private Limited</span>, a venture predicated on its foundational principles of <span className="font-semibold">Quality</span>-<span className="font-semibold">Integrity</span>-<span className="font-semibold">Service</span>.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              The team's grounding caters to market survey-based product development aimed at meeting consumer requirements, along with product management, promotional activities, sales oversight, distribution, training, administration, finance, and accounting. Only credible businesses with integral quality assurance certifications and accreditations from globally recognised organisations including <span className="font-semibold">WHO-GMP</span>, are authorised to manufacture our products.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              We are planning to launch very thoughtful products more in the <span className="font-semibold">preventive</span>, <span className="font-semibold">health restorative</span>, and <span className="font-semibold">infertility segments</span>. They will be well supported by documented and published evidence from medical textbooks and journals, ensuring our products are backed by scientific rigor and clinical validation.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-1">{founder.name}</h3>
                <p className="text-primary text-sm text-center font-medium mb-1">{founder.designation}</p>
                <p className="text-gray-400 text-xs text-center mb-4">{founder.location}</p>
                <p className="text-gray-500 text-sm leading-relaxed text-center">{founder.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-gray-50 rounded-xl border border-gray-100 p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900">
              Company Information
            </h2>

            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-1">
                  Registered Name
                </p>
                <p className="text-lg text-gray-900">
                  Quinser Pharmaceuticals Private Limited
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <div>
                  <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-1">
                    CIN
                  </p>
                  <p className="text-base text-gray-900">
                    U46497MH2025PTC453159
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-1">
                    Incorporation Date
                  </p>
                  <p className="text-base text-gray-900">
                    26th July, 2025
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-1">
                    Activity
                  </p>
                  <p className="text-base text-gray-900">
                    Marketing, Wholesale of pharmaceutical and medical goods
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-1">
                  Registered Office
                </p>
                <p className="text-base text-gray-900 leading-relaxed">
                  Plot No 72, Flat No 306 A, Vishwa Highlands CHSL Ltd,
                  Navi Mumbai, Raigad, Maharashtra, India — 410209
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
