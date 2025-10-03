import React, { useState, useEffect } from 'react';

const DheuKids = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [activeParameter, setActiveParameter] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [currentNews, setCurrentNews] = useState(0);
  const [isCharacterSpeaking, setIsCharacterSpeaking] = useState(false);
  const [activeSection, setActiveSection] = useState('parameters');

  const messages = [
    "Hello! I'm DHEU, your ocean health guide. Let's explore the SARgonauts Index together.",
    "The SARgonauts Index combines seven key parameters to measure ocean health from 0-100.",
    "Temperature changes affect coral reefs and marine biodiversity - it's our most weighted factor.",
    "Salinity stability is crucial for ocean circulation and marine organism survival.",
    "Ocean color indicates phytoplankton levels - the foundation of marine food webs.",
    "Oil spills and waste accumulation directly harm marine ecosystems and reduce our index.",
    "Real-time satellite data and AI help us monitor these changes across global waters.",
    "Click on any parameter below to learn more, or explore our methodology and applications.",
    "Together, we can understand and protect our ocean's health for future generations."
  ];

  const parameters = [
    {
      name: "Sea Surface Temperature",
      weight: 20,
      icon: "🌡️",
      color: "from-red-400 to-orange-500",
      description: "Monitors thermal changes affecting marine ecosystems",
      impact: "positive",
      goodValue: "20-28°C",
      badValue: ">32°C",
      details: "Temperature affects oxygen solubility, species distribution, and coral health. Climate change pushes temperatures beyond optimal ranges.",
      currentValue: "26.4°C",
      trend: "↑"
    },
    {
      name: "Sea Surface Salinity",
      weight: 15,
      icon: "🧂",
      color: "from-blue-400 to-cyan-500",
      description: "Tracks salinity changes crucial for ocean circulation",
      impact: "positive",
      goodValue: "34-36 PSU",
      badValue: "<30 PSU",
      details: "Salinity drives ocean currents and affects marine food chains. Freshwater influx from melting ice disrupts this balance.",
      currentValue: "35.2 PSU",
      trend: "↓"
    },
    {
      name: "Sea Surface Height",
      weight: 10,
      icon: "📏",
      color: "from-green-400 to-teal-500",
      description: "Measures sea level changes and thermal expansion",
      impact: "neutral",
      goodValue: "±2mm/year",
      badValue: ">5mm/year",
      details: "Rising sea levels indicate thermal expansion and ice melt, threatening coastal ecosystems.",
      currentValue: "+3.1mm/year",
      trend: "↑"
    },
    {
      name: "Ocean Color",
      weight: 20,
      icon: "🎨",
      color: "from-emerald-400 to-green-500",
      description: "Indicates phytoplankton concentration and productivity",
      impact: "positive",
      goodValue: "0.3-0.8 mg/m³",
      badValue: "<0.2 mg/m³",
      details: "Phytoplankton form the marine food web base and absorb CO2. Color changes indicate ecosystem productivity.",
      currentValue: "0.45 mg/m³",
      trend: "→"
    },
    {
      name: "Wave Frequency",
      weight: 10,
      icon: "🌊",
      color: "from-blue-500 to-indigo-500",
      description: "Measures wave patterns affecting coastal dynamics",
      impact: "neutral",
      goodValue: "1-3m average",
      badValue: ">5m average",
      details: "Wave patterns influence coastal erosion and nutrient mixing in marine ecosystems.",
      currentValue: "2.1m average",
      trend: "↑"
    },
    {
      name: "Oil Slicks",
      weight: -15,
      icon: "🛢️",
      color: "from-gray-600 to-red-600",
      description: "Detects petroleum contamination incidents",
      impact: "negative",
      goodValue: "0 km²",
      badValue: ">10 km²",
      details: "Oil spills create toxicity, block sunlight, and disrupt entire marine food chains.",
      currentValue: "2.3 km²",
      trend: "↓"
    },
    {
      name: "Waste Accumulation",
      weight: -10,
      icon: "🗑️",
      color: "from-red-500 to-pink-500",
      description: "Tracks plastic debris and marine pollution",
      impact: "negative",
      goodValue: "<5 items/km²",
      badValue: ">50 items/km²",
      details: "Marine debris entangles wildlife and breaks down into microplastics entering food chains.",
      currentValue: "12 items/km²",
      trend: "↑"
    }
  ];

  const newsItems = [
    {
      title: "Great Pacific Garbage Patch Reduction Initiative",
      summary: "International cleanup efforts show 12% reduction in plastic concentration",
      impact: "Positive",
      date: "3 hours ago",
      source: "Ocean Cleanup Foundation",
      link: "https://theoceancleanup.com"
    },
    {
      title: "Caribbean Coral Restoration Success",
      summary: "New coral planting techniques show 78% survival rate in warming waters",
      impact: "Positive",
      date: "6 hours ago",
      source: "Marine Biology Institute",
      link: "https://www.nature.org"
    },
    {
      title: "Arctic Sea Ice Monitoring Alert",
      summary: "Accelerated melting rates detected in northern ice sheets",
      impact: "High",
      date: "12 hours ago",
      source: "NOAA Climate Center",
      link: "https://www.climate.gov"
    },
    {
      title: "Phytoplankton Bloom Recovery",
      summary: "North Atlantic shows increased marine productivity indicators",
      impact: "Positive",
      date: "1 day ago",
      source: "NASA Earth Observatory",
      link: "https://earthobservatory.nasa.gov"
    }
  ];

  const healthyExample = {
    location: "Great Barrier Reef Marine Park",
    index: 82,
    parameters: {
      temperature: "25.8°C",
      salinity: "35.1 PSU",
      height: "+3.5mm/year",
      color: "0.52 mg/m³",
      waves: "1.8m",
      oil: "0 km²",
      waste: "3 items/km²"
    }
  };

  const unhealthyExample = {
    location: "Gulf of Mexico Dead Zone",
    index: 28,
    parameters: {
      temperature: "31.5°C",
      salinity: "31.8 PSU",
      height: "+6.2mm/year",
      color: "0.61 mg/m³",
      waves: "4.1m",
      oil: "18 km²",
      waste: "67 items/km²"
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [newsItems.length]);

  const handleCharacterClick = () => {
    setIsCharacterSpeaking(true);
    setMessageIndex((prev) => (prev + 1) % messages.length);
    setTimeout(() => setIsCharacterSpeaking(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 font-sans text-gray-800">

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

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Content */}
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold">
                Meet <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 bg-clip-text text-transparent">DHEU</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Your intelligent ocean health guide. Learn about marine monitoring through the comprehensive SARgonauts Index system.
              </p>

              {/* Navigation Pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  { id: 'parameters', label: 'Index Parameters', icon: '📊' },
                  { id: 'methodology', label: 'Methodology', icon: '🔬' },
                  { id: 'applications', label: 'Applications', icon: '🎯' }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeSection === section.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                      }`}
                  >
                    {section.icon} {section.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: DHEU Character */}
            <div className="text-center lg:text-right relative">
              <div className="relative inline-block">

                {/* DHEU Character - Round Bubble Container */}
                <div
                  className={`w-48 h-48 bg-gradient-to-br from-blue-100/80 via-cyan-100/80 to-blue-200/80 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-2xl border-4 border-white/70 backdrop-blur-md ${isCharacterSpeaking ? 'animate-bounce' : ''
                    }`}
                  onClick={handleCharacterClick}
                  style={{
                    animation: 'float 4s ease-in-out infinite',
                  }}
                >
                  {/* Character Image Inside Bubble */}
                  <img
                    src="/assets/dheub.png"
                    alt="DHEU Character"
                    className="w-36 h-36 object-contain z-10 relative"
                    style={{
                      filter: 'drop-shadow(0 4px 12px rgba(59, 130, 246, 0.4)) brightness(1.1) contrast(1.1)',
                    }}
                  />
                  {/* Animated Ring Effect */}
                  <div className="absolute inset-0 rounded-full border-4 border-blue-400/30 animate-ping"></div>
                  <div className="absolute inset-2 rounded-full border-2 border-cyan-400/40 animate-pulse"></div>
                </div>

                {/* Speech Bubble - Now below the character, not absolutely positioned */}
                <div className="mt-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 max-w-xs border-2 border-blue-300/30 mx-auto relative">
                  <p className="text-sm text-gray-800 mb-3 leading-relaxed">{messages[messageIndex]}</p>
                  <button
                    onClick={handleCharacterClick}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    Continue →
                  </button>
                  {/* Speech bubble tail pointing up */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-b-white/95"></div>
                  </div>
                </div>

                {/* Click Instruction */}
                <p className="text-sm text-gray-500 mt-4">Click DHEU to learn more!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 bg-white/50">
        <div className="container mx-auto max-w-7xl">

          {/* Parameters Section */}
          {activeSection === 'parameters' && (
            <div className="space-y-12">

              {/* Section Header */}
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-gray-800">SARgonauts Index Parameters</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Seven key indicators combine to create a comprehensive ocean health score from 0-100
                </p>
              </div>

              {/* Parameters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {parameters.map((param, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border cursor-pointer ${activeParameter === index ? 'border-blue-300 shadow-lg' : 'border-gray-200'
                      }`}
                    onClick={() => setActiveParameter(activeParameter === index ? null : index)}
                  >
                    {/* Parameter Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${param.color} flex items-center justify-center text-2xl`}>
                          {param.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-sm">{param.name}</h3>
                          <p className="text-xs text-gray-500">Weight: {Math.abs(param.weight)}%</p>
                        </div>
                      </div>

                      {/* Current Value */}
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-800">{param.currentValue}</div>
                        <div className={`text-lg ${param.trend === '↑' ? 'text-red-500' : param.trend === '↓' ? 'text-green-500' : 'text-gray-400'}`}>
                          {param.trend}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{param.description}</p>

                    {/* Expandable Details */}
                    {activeParameter === index && (
                      <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 animate-fadeIn">
                        <p className="text-xs text-gray-700">{param.details}</p>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="bg-green-50 p-2 rounded">
                            <span className="text-green-700 font-medium">Optimal: </span>
                            <span className="text-green-800">{param.goodValue}</span>
                          </div>
                          <div className="bg-red-50 p-2 rounded">
                            <span className="text-red-700 font-medium">Concerning: </span>
                            <span className="text-red-800">{param.badValue}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Comparison Examples */}
              <div className="mt-16">
                <div className="text-center mb-8">
                  <button
                    onClick={() => setShowComparison(!showComparison)}
                    className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors duration-300"
                  >
                    {showComparison ? 'Hide' : 'View'} Real Examples
                  </button>
                </div>

                {showComparison && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">

                    {/* Healthy Example */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                      <div className="flex items-center mb-4">
                        <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center text-2xl mr-4">
                          ✓
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">Healthy Ocean</h3>
                          <p className="text-sm text-gray-600">{healthyExample.location}</p>
                          <div className="text-3xl font-bold text-green-600">{healthyExample.index}/100</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(healthyExample.parameters).map(([key, value]) => (
                          <div key={key} className="bg-white/70 p-2 rounded">
                            <span className="font-medium capitalize">{key}: </span>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Unhealthy Example */}
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
                      <div className="flex items-center mb-4">
                        <div className="w-14 h-14 bg-red-500 rounded-xl flex items-center justify-center text-2xl mr-4">
                          ⚠
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">Stressed Ocean</h3>
                          <p className="text-sm text-gray-600">{unhealthyExample.location}</p>
                          <div className="text-3xl font-bold text-red-600">{unhealthyExample.index}/100</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(unhealthyExample.parameters).map(([key, value]) => (
                          <div key={key} className="bg-white/70 p-2 rounded">
                            <span className="font-medium capitalize">{key}: </span>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Methodology Section */}
          {activeSection === 'methodology' && (
            <div className="space-y-12 animate-fadeIn">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-gray-800">How It Works</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Advanced satellite monitoring and AI analysis for comprehensive ocean health assessment
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800">Data Collection</h3>
                  <div className="space-y-4">
                    {[
                      'NASA Earth Observation System (EOS) satellites provide temperature and color data',
                      'ESA Sentinel missions monitor sea surface height and salinity',
                      'Synthetic Aperture Radar detects oil slicks and waste patches',
                      'Machine learning processes millions of data points daily'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800">Quality Assurance</h3>
                  <div className="space-y-4">
                    {[
                      'Multi-source data validation ensures accuracy',
                      'Historical trend analysis prevents anomalous readings',
                      'Ground-truth verification through research vessels',
                      'Peer-reviewed algorithms validated by marine scientists',
                      'Real-time error correction and data filtering'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Applications Section */}
          {activeSection === 'applications' && (
            <div className="space-y-12 animate-fadeIn">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-gray-800">Real-World Impact</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Supporting conservation, research, and policy decisions worldwide
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Marine Conservation',
                    icon: '🐋',
                    description: 'Protected area monitoring and species habitat assessment',
                    applications: ['Marine Protected Area effectiveness', 'Migration route tracking', 'Breeding ground protection']
                  },
                  {
                    title: 'Climate Research',
                    icon: '🌍',
                    description: 'Long-term climate change impact analysis',
                    applications: ['Sea level rise prediction', 'Ocean acidification tracking', 'Temperature trend analysis']
                  },
                  {
                    title: 'Policy Making',
                    icon: '⚖️',
                    description: 'Evidence-based environmental policy decisions',
                    applications: ['Pollution regulation enforcement', 'Fishing quota determination', 'International treaty monitoring']
                  }
                ].map((app, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">{app.icon}</div>
                      <h3 className="text-xl font-bold text-gray-800">{app.title}</h3>
                      <p className="text-gray-600 mt-2">{app.description}</p>
                    </div>
                    <ul className="space-y-2">
                      {app.applications.map((item, i) => (
                        <li key={i} className="flex items-center space-x-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

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
                  href="https://www.facebook.com/profile.php?id=61581629313689"
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

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #06b6d4);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #0891b2);
        }
      `}</style>
    </div>
  );
};

export default DheuKids;