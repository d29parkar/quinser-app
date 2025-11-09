const Team = () => {
  const teamMembers = [
    {
      name: "Ramkumar Kooliyadath",
      role: "Director",
      bio: "With over two decades of experience in the pharmaceutical industry, Ramkumar brings deep expertise in business development and operations. Starting his career as a medical representative, he progressed through various roles, gaining comprehensive knowledge of the pharmaceutical market. He has extensive experience in sales management and distribution networks across multiple regions. His strategic vision and commitment to quality have been instrumental in establishing Quinser's foundation.",
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      location: "India"
    },
    {
      name: "Kiran Sudhakar Pimparkar",
      role: "Director",
      bio: "Kiran has been in the pharmaceutical industry for 25 years. He started his career as a medical representative, climbing to the position of Area Sales Manager in Fourrts India, where he managed over 8 districts in Maharashtra. He then started his own wholesale business, active in Jalgaon, Nashik, Akola, and Dhule. He brings extensive experience in marketing and quality, with a deep understanding of regional market dynamics and customer needs.",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      location: "Jalgaon, India"
    },
    {
      name: "Vishwanath Ananda Patil",
      role: "Director",
      bio: "Vishwanath brings over 20 years of pharmaceutical industry experience, having worked across various segments from field sales to distribution management. His journey began as a medical representative, where he developed strong relationships with healthcare professionals. He progressed to regional management roles, overseeing sales operations across multiple territories. His expertise in supply chain management and market penetration strategies has been crucial in expanding Quinser's reach.",
      photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
      location: "India"
    },
    {
      name: "Ajay Katare",
      role: "Director",
      bio: "With a career spanning more than 22 years in pharmaceuticals, Ajay has built a strong foundation in sales, marketing, and business operations. Beginning as a medical representative, his exceptional performance led him to management positions where he oversaw multiple districts. He has extensive experience in building distribution networks and managing key accounts. His focus on quality assurance and regulatory compliance ensures Quinser maintains the highest industry standards.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      location: "India"
    },
    {
      name: "Shakuntala Devi",
      role: "Director",
      bio: "Shakuntala brings over 20 years of pharmaceutical industry expertise, with a strong background in sales and business development. Her career progression from medical representative to senior management roles has given her comprehensive insights into market dynamics and customer relationships. She has managed extensive sales territories and distribution networks, building strong partnerships across the pharmaceutical value chain. Her commitment to excellence and patient-centric approach drives Quinser's mission forward.",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      location: "India"
    },
    {
      name: "Chidanand Umesh Rajmane",
      role: "Director",
      bio: "Chidanand has dedicated over 23 years to the pharmaceutical industry, starting as a medical representative and advancing through various leadership roles. His experience includes managing large sales teams, developing market strategies, and establishing robust distribution channels across multiple regions. He has a proven track record in business growth and operational excellence. His expertise in quality management and regulatory affairs ensures Quinser's products meet international standards.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      location: "India"
    }
  ]

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-background via-card-bg to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">Our Team</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Meet the leadership team driving Quinser Pharmaceuticals towards excellence
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border hover:border-primary/20"
            >
              <div className="text-center mb-6">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-40 h-40 rounded-full mx-auto object-cover mb-4 image-desaturate"
                />
                <h3 className="text-2xl font-semibold text-text mb-2">{member.name}</h3>
                <p className="text-accent font-medium mb-2">{member.role}</p>
                <p className="text-text-secondary text-sm">{member.location}</p>
              </div>
              <p className="text-text-secondary leading-relaxed text-center">{member.bio}</p>
            </div>
          ))}
        </div>

        {/* Company Values Section */}
        <div className="mt-16 bg-gradient-to-br from-white to-primary/5 rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10">
          <h2 className="text-3xl font-bold text-text text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">Quality</h3>
              <p className="text-text-secondary">
                Uncompromising commitment to the highest standards in every aspect of our operations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">Integrity</h3>
              <p className="text-text-secondary">
                Ethical practices and transparency in all our business dealings and relationships.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">Service</h3>
              <p className="text-text-secondary">
                Dedicated to serving our customers, partners, and communities with excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Team

