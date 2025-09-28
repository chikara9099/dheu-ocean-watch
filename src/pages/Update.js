import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [currentIndex, setCurrentIndex] = useState(78.4); // SARgonauts index (0-100, higher = better)
  const [selectedLetter, setSelectedLetter] = useState(null);

  // Specific monitoring region
  const monitoringRegion = {
    name: "Bay of Bengal",
    coordinates: "21.0000° N, 90.0000° E",
    area: "2.17 million km²",
    countries: ["Bangladesh", "India", "Myanmar", "Sri Lanka", "Thailand"]
  };

  // Sample dynamic data based on SARgonauts index (higher = better)
  const getSeverityLevel = (index) => {
    if (index >= 80) return { level: 'Excellent', color: 'from-green-500 to-emerald-600', urgency: 'CONTINUE EXCELLENT PRACTICES', bgColor: 'bg-green-50' };
    if (index >= 60) return { level: 'Good', color: 'from-blue-500 to-green-500', urgency: 'MAINTAIN CURRENT EFFORTS', bgColor: 'bg-blue-50' };
    if (index >= 40) return { level: 'Fair', color: 'from-yellow-500 to-orange-500', urgency: 'IMPROVEMENT NEEDED', bgColor: 'bg-yellow-50' };
    if (index >= 20) return { level: 'Poor', color: 'from-orange-500 to-red-600', urgency: 'URGENT ACTION REQUIRED', bgColor: 'bg-orange-50' };
    return { level: 'Critical', color: 'from-red-600 to-red-800', urgency: 'IMMEDIATE INTERVENTION', bgColor: 'bg-red-50' };
  };

  const severity = getSeverityLevel(currentIndex);

  // Reward opportunities section
  const rewardOpportunities = [
    {
      title: "UNDP Ocean Innovation Challenge",
      amount: "$50,000 - $250,000 USD",
      deadline: "Rolling Applications",
      description: "Supporting innovative solutions for ocean conservation and sustainable blue economy initiatives.",
      link: "https://www.undp.org/ocean",
      category: "Innovation",
      icon: "💡"
    },
    {
      title: "UNESCO Clean Oceans Program",
      amount: "$115 Million Available",
      deadline: "Quarterly Reviews",
      description: "Multi-agency funding for clean and healthy ocean restoration projects worldwide.",
      link: "https://www.unesco.org/en/articles/fao-ioc/unesco-and-partner-agencies-tasked-leading-115-million-clean-and-healthy-oceans-program",
      category: "Research",
      icon: "🔬"
    },
    {
      title: "Community Ocean Watch Grants",
      amount: "$10,000 - $75,000 USD",
      deadline: "Monthly Applications",
      description: "Local community initiatives for marine protection and environmental advocacy programs.",
      link: "#",
      category: "Community",
      icon: "👥"
    }
  ];

  // Dynamic open letters based on current conditions
  const openLetters = [
    {
      id: 1,
      title: "To Govt. Policy Makers",
      recipient: "Environmental Protection Agencies & Maritime Authorities",
      urgency: severity.urgency,
      preview: "Current regional ocean health shows promising trends requiring continued policy support...",
      image: "/assets/science.avif",
      date: new Date().toLocaleDateString(),
      content: `Dear Honorable Policy Makers,

The SARgonauts Index for ${monitoringRegion.name} currently stands at ${currentIndex.toFixed(1)}/100, indicating ${severity.level.toLowerCase()} conditions in our regional ocean systems. This letter serves as both recognition of current progress and a call for sustained commitment.

REGIONAL ASSESSMENT - ${monitoringRegion.name}:
• Coordinates: ${monitoringRegion.coordinates}
• Coverage Area: ${monitoringRegion.area}
• Affected Nations: ${monitoringRegion.countries.join(', ')}

CURRENT STATUS OVERVIEW:
• Ocean health metrics show ${severity.level.toLowerCase()} performance levels
• Marine ecosystem indicators demonstrate positive trends in 67% of monitored zones
• Coastal water quality improvements noted across major population centers

RECOMMENDED ACTIONS:
1. Maintain current environmental protection funding levels
2. Expand successful monitoring programs to adjacent regions
3. Strengthen international cooperation frameworks
4. Invest in next-generation ocean health technologies

The scientific community commends current efforts and stands ready to support evidence-based policy continuation and enhancement.

Respectfully submitted,
Team SARgonauts & Regional Ocean Health Coalition

Technical reports and detailed recommendations available upon request.`
    },
    {
      id: 2,
      title: "To Industrial Leaders",
      recipient: "Manufacturing, Shipping & Energy Corporations",
      urgency: severity.urgency,
      preview: "Sustainable industry practices show positive impact on regional marine ecosystems...",
      image: "/assets/ocean2.avif",
      date: new Date().toLocaleDateString(),
      content: `Dear Industry Leaders,

Our latest environmental assessment reveals a SARgonauts Index of ${currentIndex.toFixed(1)}/100 for ${monitoringRegion.name}, demonstrating ${severity.level.toLowerCase()} ocean health conditions. Your continued commitment to sustainable practices is showing measurable positive impact.

REGIONAL INDUSTRY IMPACT - ${monitoringRegion.name}:
• Monitoring Zone: ${monitoringRegion.coordinates}
• Industrial Compliance: 73% of operations meet enhanced standards
• Pollution Reduction: 34% decrease in harmful discharge incidents
• Green Technology Adoption: 58% increase in clean technology implementation

PARTNERSHIP EXPANSION OPPORTUNITIES:
1. Scale successful sustainability initiatives across the region
2. Share best practices with emerging market partners
3. Invest in advanced waste treatment technologies
4. Develop regional green certification programs

Available funding opportunities include:
• UNDP Ocean Innovation Challenge: $50,000-$250,000
• UNESCO Clean Oceans Program: Up to $115 million
• Tax incentives for early adopters of clean technologies

Let's schedule a regional summit to discuss expansion strategies and partnership opportunities.

Sincerely,
Team SARgonauts Environmental Initiative

Green certification and funding application support available.`
    },
    {
      id: 3,
      title: "To Coastal Communities",
      recipient: "Local Governments, Community Leaders & Volunteers",
      urgency: "COMMUNITY RECOGNITION & EXPANSION",
      preview: "Local conservation efforts contribute significantly to regional ocean health improvements...",
      image: "/assets/ocean1.avif",
      date: new Date().toLocaleDateString(),
      content: `Dear Community Champions,

With ${monitoringRegion.name} ocean health conditions at ${currentIndex.toFixed(1)}/100, your local communities have played a crucial role in achieving these positive results. Your continued engagement is vital for sustained progress.

COMMUNITY IMPACT ASSESSMENT - ${monitoringRegion.name}:
• Regional Coverage: ${monitoringRegion.area}
• Active Communities: 2.3 million residents engaged in conservation
• Local Success Stories: 67% improvement in coastal water quality
• Economic Benefits: 23% increase in sustainable tourism revenue

AVAILABLE COMMUNITY REWARDS:
💰 Community Ocean Watch Grants: $10,000-$75,000
🏆 Regional Environmental Leadership Recognition
📚 Free training programs and educational resources
🌊 Direct access to real-time ocean health monitoring
🎓 University partnership opportunities for local research

CONTINUED ACTION STEPS:
1. Expand successful neighborhood ocean watch programs
2. Implement community-based monitoring in new areas
3. Develop youth environmental leadership programs
4. Create regional best-practice sharing networks

Your community's voice continues to matter. Together, we're creating measurable positive change for coastal regions.

Join our expanded initiative today!

Team SARgonauts Community Outreach
Contact: community@sargonauts.org

Application deadlines and funding details available on our portal.`
    }
  ];

  // Gentle index variation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const variation = (Math.random() - 0.5) * 1.2; // Smaller variation
        return Math.max(0, Math.min(100, prev + variation));
      });
    }, 8000); // Slower updates
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Header / Navbar */}
      <header
        id="header"
        className="bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 hover:shadow-lg"
        style={{ height: '145px' }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-full">
          {/* Logo */}
          <a href="/" className="block transform hover:scale-105 transition-transform duration-200">
            <img
              src="/assets/DHEU.png"
              alt="DHEU logo"
              className="h-20 md:h-24 transition-all duration-200"
            />
          </a>

          {/* Navigation */}
          <nav>
            <ul className="flex space-x-8">
              {[
                { name: 'Home', href: '/' },
                { name: 'Dashboard', href: '/dashboard' },
                { name: 'Simulator', href: '/simulator' },
                { name: 'Updates', href: '/update' },
                { name: 'DheuKids', href: '/dheukids' },
                { name: 'Team', href: '/team' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 brightness-75"
        >
          <source src="/assets/banner.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

        <div className="relative z-10 container mx-auto px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Ocean Advocacy
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Open Letters
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Evidence-based calls to action for governments, industries, and communities to protect our marine ecosystems.
          </p>

          {/* Current SARgonauts Index Display */}
          <div className="bg-black/30 backdrop-blur-md rounded-3xl p-8 mb-8 max-w-lg mx-auto hover:bg-black/40 transition-all duration-300 transform hover:scale-105">
            <div className="text-sm opacity-80 mb-2">Current SARgonauts Index</div>
            <div className="text-sm opacity-70 mb-4">{monitoringRegion.name} Region</div>
            <div className="text-6xl font-bold mb-4">{currentIndex.toFixed(1)}</div>
            <div className={`inline-block px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r ${severity.color} shadow-lg`}>
              {severity.level}
            </div>
            <div className="text-sm mt-4 opacity-90">{severity.urgency}</div>
            <div className="text-xs mt-2 opacity-70">{monitoringRegion.coordinates}</div>
          </div>

          <a
            href="#letters"
            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg"
          >
            Read Open Letters
          </a>
        </div>
      </section>

      {/* Reward Opportunities Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Available Funding & Rewards</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Support ocean advocacy initiatives through international grants, innovation challenges, and community rewards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {rewardOpportunities.map((reward, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 border border-white/20 transform hover:scale-105 hover:-translate-y-2 cursor-pointer"
                onClick={() => window.open(reward.link, '_blank')}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-4xl">{reward.icon}</div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${reward.category === 'Innovation' ? 'bg-purple-500/20 text-purple-200' :
                      reward.category === 'Research' ? 'bg-blue-500/20 text-blue-200' :
                        'bg-green-500/20 text-green-200'
                    }`}>
                    {reward.category}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-200 transition-colors duration-300">
                  {reward.title}
                </h3>

                <div className="mb-4">
                  <div className="text-3xl font-bold text-cyan-300 mb-2">{reward.amount}</div>
                  <div className="text-sm opacity-80">Deadline: {reward.deadline}</div>
                </div>

                <p className="text-white/80 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                  {reward.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-70">Learn More →</span>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-2xl mx-auto border border-white/20">
              <h3 className="text-2xl font-bold mb-4">Application Support Available</h3>
              <p className="text-white/80 mb-6">
                Our team provides guidance for grant applications, proposal writing, and project development to maximize funding success.
              </p>
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                Get Application Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SARgonauts Index Explanation */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Understanding the SARgonauts Index</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A comprehensive environmental monitoring system that quantifies ocean health through satellite data, AI analysis, and real-time environmental indicators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                range: "76-100",
                level: "Excellent",
                color: "from-green-500 to-emerald-600",
                description: "Pristine marine ecosystems with optimal health indicators and biodiversity"
              },
              {
                range: "51-75",
                level: "Good",
                color: "from-blue-500 to-green-500",
                description: "Healthy ocean conditions with minor environmental stressors requiring maintenance"
              },
              {
                range: "26-50",
                level: "Fair",
                color: "from-yellow-500 to-orange-500",
                description: "Moderate pollution levels demanding active intervention and improvement strategies"
              },
              {
                range: "0-25",
                level: "Critical",
                color: "from-orange-500 to-red-600",
                description: "Severe environmental degradation requiring immediate emergency response protocols"
              }
            ].map((item, i) => (
              <div key={i} className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 transform hover:scale-105 hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-6 group-hover:rotate-6 transition-transform duration-300 shadow-lg`}>
                  {item.range}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.level}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Letters Grid */}
      <main id="letters" className="py-20 bg-gradient-to-b from-slate-50 via-blue-50/20 to-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Current Open Letters</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dynamic advocacy letters updated daily based on real-time ocean health monitoring and environmental data analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {openLetters.map((letter, index) => (
              <div
                key={letter.id}
                className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer transform hover:scale-105 hover:-translate-y-2"
                onClick={() => setSelectedLetter(letter)}
              >
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <img
                    src={letter.image}
                    alt={letter.title}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Urgency Badge */}
                  <div className="absolute top-6 left-6">
                    <div className={`px-4 py-2 rounded-full text-white font-bold text-sm bg-gradient-to-r ${severity.color} shadow-lg`}>
                      {letter.urgency}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="absolute bottom-6 right-6">
                    <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                      {letter.date}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {letter.title}
                    </h3>
                    <p className="text-blue-600 font-semibold text-sm mb-4">{letter.recipient}</p>
                    <p className="text-gray-600 leading-relaxed">{letter.preview}</p>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 rounded-2xl font-semibold transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 shadow-lg">
                    Read Full Letter →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Join the Advocacy Movement</h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                These letters represent collective scientific evidence and community voices. Share them, support the cause, and help amplify the message for ocean protection.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Share Letters
                </button>
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-2xl transition-all duration-300">
                  Submit Your Voice
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 via-transparent to-cyan-600/20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

            {/* Connect Section */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Connect</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Stay updated with ocean health insights daily
              </p>

              {/* Social Icons */}
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                  title="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.983h-1.5c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                  title="Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                  title="X (Twitter)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* DHEU Ocean Watch Info */}
            <div className="space-y-4 text-center">
              <h4 className="text-xl font-bold">DHEU Ocean Watch</h4>
              <p className="text-gray-400 text-sm">Protecting our oceans through data.</p>
            </div>

            {/* Newsletter Section */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Stay Updated</h4>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-300 mb-2 block">Your Email Address</span>
                  <input
                    type="email"
                    placeholder="Enter email here"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all duration-300 hover:bg-slate-700/70"
                  />
                </label>
                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>

          <hr className="border-slate-700/50 my-8" />

          <div className="text-center">
            <p className="text-gray-500 text-sm">
              &copy; 2025 DHEU Ocean Watch. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Letter Modal */}
      {selectedLetter && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedLetter(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedLetter.title}</h2>
                  <p className="text-blue-600 font-semibold">{selectedLetter.recipient}</p>
                  <p className="text-gray-500 text-sm mt-2">{selectedLetter.date}</p>
                  <div className="mt-3 text-sm text-gray-600">
                    <span className="font-medium">Region:</span> {monitoringRegion.name} ({monitoringRegion.coordinates})
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-2xl text-gray-600 transition-colors duration-200"
                >
                  ×
                </button>
              </div>

              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed text-lg">
                  {selectedLetter.content}
                </div>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Share This Letter
                </button>
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-xl transition-all duration-300">
                  Download PDF
                </button>
                <button
                  onClick={() => window.open('https://www.undp.org/ocean', '_blank')}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Apply for Funding
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}