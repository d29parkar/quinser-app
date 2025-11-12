import { Link } from 'react-router-dom'

const Home = () => {
  const founders = [
    {
      name: "Ramkumar Kooliyadath",
      designation: "Director",
      location: "India",
      bio: "With over two decades of experience in the pharmaceutical industry, Ramkumar brings deep expertise in business development and operations. Starting his career as a medical representative, he progressed through various roles, gaining comprehensive knowledge of the pharmaceutical market. He has extensive experience in sales management and distribution networks across multiple regions. His strategic vision and commitment to quality have been instrumental in establishing Quinser's foundation.",
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"
    },
    {
      name: "Kiran Sudhakar Pimparkar",
      designation: "Director",
      location: "Jalgaon, India",
      bio: "Kiran has been in the pharmaceutical industry for 25 years. He started his career as a medical representative, climbing to the position of Area Sales Manager in Fourrts India, where he managed over 8 districts in Maharashtra. He then started his own wholesale business, active in Jalgaon, Nashik, Akola, and Dhule. He brings extensive experience in marketing and quality, with a deep understanding of regional market dynamics and customer needs.",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"
    },
    {
      name: "Vishwanath Ananda Patil",
      designation: "Director",
      location: "India",
      bio: "Vishwanath brings over 20 years of pharmaceutical industry experience, having worked across various segments from field sales to distribution management. His journey began as a medical representative, where he developed strong relationships with healthcare professionals. He progressed to regional management roles, overseeing sales operations across multiple territories. His expertise in supply chain management and market penetration strategies has been crucial in expanding Quinser's reach.",
      photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop"
    },
    {
      name: "Ajay Katare",
      designation: "Director",
      location: "India",
      bio: "With a career spanning more than 22 years in pharmaceuticals, Ajay has built a strong foundation in sales, marketing, and business operations. Beginning as a medical representative, his exceptional performance led him to management positions where he oversaw multiple districts. He has extensive experience in building distribution networks and managing key accounts. His focus on quality assurance and regulatory compliance ensures Quinser maintains the highest industry standards.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      name: "Shakuntala Devi",
      designation: "Director",
      location: "India",
      bio: "Shakuntala brings over 20 years of pharmaceutical industry expertise, with a strong background in sales and business development. Her career progression from medical representative to senior management roles has given her comprehensive insights into market dynamics and customer relationships. She has managed extensive sales territories and distribution networks, building strong partnerships across the pharmaceutical value chain. Her commitment to excellence and patient-centric approach drives Quinser's mission forward.",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
    },
    {
      name: "Chidanand Umesh Rajmane",
      designation: "Director",
      location: "India",
      bio: "Chidanand has dedicated over 23 years to the pharmaceutical industry, starting as a medical representative and advancing through various leadership roles. His experience includes managing large sales teams, developing market strategies, and establishing robust distribution channels across multiple regions. He has a proven track record in business growth and operational excellence. His expertise in quality management and regulatory affairs ensures Quinser's products meet international standards.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-background py-20 md:py-32 overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            {/* Logo - Blended with background */}
            <div className="mb-12 flex justify-center">
              <img 
                src="/assets/logo.png" 
                alt="Quinser Pharmaceuticals Private Limited" 
                className="h-28 md:h-40 w-auto mix-blend-multiply opacity-90"
              />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-text mb-6 tracking-tight">
              Quality, Integrity and Service
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              35 years of professional expertise in the pharmaceutical sector led to the formation of Quinser Pharmaceuticals Private Limited, a venture predicated on its foundational principles of Quality, Integrity, and Service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="px-8 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-medium hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Explore Products
              </Link>
              <Link
                to="/manufacturing"
                className="px-8 py-3 bg-white text-primary border-2 border-primary rounded-xl font-medium hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Our Capabilities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-b from-card-bg to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-6 text-center">About Quinser</h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              Our company's name <span className="font-semibold text-text">QUINSER</span> aptly describes our ethos and underscores our commitment to the core values: <span className="font-semibold text-text">Quality, Integrity, and Service</span>. 35 years of professional expertise in the pharmaceutical sector led to the formation of Quinser Pharmaceuticals Private Limited, a venture predicated on its foundational principles of Quality-Integrity-Service.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              The team's grounding caters to market survey-based product development aimed at meeting consumer requirements, along with product management, promotional activities, sales oversight, distribution, training, administration, finance, and accounting. Only credible businesses with integral quality assurance certifications and accreditations from globally recognised organisations including <span className="font-semibold text-text">WHO-GMP</span>, are authorised to manufacture our products.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              We are planning to launch very thoughtful products more in the <span className="font-semibold text-text">preventive, health restorative, and infertility segments</span>. They will be well supported by documented and published evidence from medical textbooks and journals, ensuring our products are backed by scientific rigor and clinical validation.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 bg-gradient-to-b from-background via-card-bg to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-text text-center mb-12">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border hover:border-primary/20"
              >
                <div className="mb-4">
                  <img
                    src={founder.photo}
                    alt={founder.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover image-desaturate"
                  />
                </div>
                <h3 className="text-xl font-semibold text-text text-center mb-2">{founder.name}</h3>
                <p className="text-accent text-center font-medium mb-2">{founder.designation}</p>
                <p className="text-text-secondary text-sm text-center mb-4">{founder.location}</p>
                <p className="text-text-secondary text-sm leading-relaxed text-center">{founder.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-card-bg to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-text mb-6 text-center">Company Information</h2>
              <div className="space-y-4 text-text-secondary">
                <p className="text-lg">
                  <span className="font-semibold text-text">Registered Name:</span> Quinser Pharmaceuticals Private Limited
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-text">CIN:</span> U46497MH2025PTC453159
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-text">Incorporation Date:</span> 26th July, 2025
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-text">Registered Office:</span> Plot No 72, Flat No 306 A, Vishwa Highlands CHSL Ltd, Raigad, Maharashtra, India - 410209
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-text">Activity:</span> Wholesale of pharmaceutical and medical goods
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
