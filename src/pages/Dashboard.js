import React, { useState } from 'react';

const Dashboard = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How does the dashboard work?",
      answer:
        "The dashboard aggregates news from multiple portals and displays current ocean conditions like oil slicks and temperature using NASA Earth data.",
    },
    {
      id: 2,
      question: "What kind of data is displayed?",
      answer:
        "DHEU uses NASA Earth data and trusted news portals to simulate ocean conditions such as waste, chemical products, and temperature in a 2D interactive map.",
    },
    {
      id: 3,
      question: "Is this tool educational?",
      answer:
        "Yes, DHEU aims to educate users on ocean health by providing real-time data and interactive simulations for better understanding.",
    },
    {
      id: 4,
      question: "How is news shared across the platform?",
      answer:
        "News updates are aggregated from trusted environmental and scientific sources, then categorized for clarity and relevance.",
    },
    {
      id: 5,
      question: "What data sources are used?",
      answer:
        "DHEU uses NASA Earth data and trusted news portals to simulate ocean conditions such as waste, chemical products, and temperature in a 2D interactive map.",
    },
    {
      id: 6,
      question: "Who is Team Sargonauts?",
      answer:
        "Team SARgonauts is the group behind DHEU, dedicated to educating users about ocean health through innovative web tools.",
    },
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <>
      {/* Header / Navbar (Sticky) */}
      <header
        className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300 hover:shadow-lg border-b border-blue-100/50"
        style={{ height: '120px' }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-full">
          {/* Logo */}
          <a href="/" className="block transform hover:scale-105 transition-transform duration-200">
            <img
              src="/assets/DHEU.png"
              alt="DHEU logo"
              className="h-16 md:h-20 transition-all duration-200"
            />
          </a>

          {/* Navigation */}
          <nav>
            <ul className="flex space-x-8">
              {[
                { name: 'Home', href: '/' },
                { name: 'Dashboard', href: '/dashboard' },
                { name: 'Simulator', href: '/simulator' },
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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 font-sans text-gray-800 relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-200/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Header */}
      <section className="relative py-16 px-4 sm:px-8">
        <div className="container mx-auto text-center relative z-10">
          <div className="transform hover:scale-105 transition-all duration-500">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 bg-clip-text text-transparent mb-6">
              Ocean Health Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real-time monitoring powered by NASA data and global news sources
            </p>
          </div>
          
          {/* Floating Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            {[
              { label: 'Data Sources', value: '15+', icon: '📊' },
              { label: 'Live Updates', value: '24/7', icon: '⚡' },
              { label: 'Ocean Coverage', value: '100%', icon: '🌊' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-white/30"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
        
        {/* Left Side - FAQ Cards */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg">Everything you need to know about our ocean monitoring system</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center bg-gradient-to-r from-transparent to-blue-50/30 hover:from-blue-50/30 hover:to-cyan-50/30 transition-all duration-300"
                  aria-expanded={openFaq === faq.id}
                >
                  <span className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
                    {faq.question}
                  </span>
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-all duration-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 text-blue-600 transform transition-transform duration-300 ${
                          openFaq === faq.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                <div
                  className={`overflow-hidden bg-white/50 backdrop-blur-sm transition-all duration-500 ease-out ${
                    openFaq === faq.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 py-5">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Enhanced Images & Info */}
        <div className="space-y-8">
          {/* Image 1: Dashboard Preview */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/30 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group">
            <div className="relative overflow-hidden">
              <img
                src="/assets/data.avif"
                alt="Digital dashboard displaying oceanic data and environmental indicators"
                className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                Live Data
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-200">
                Real-Time Ocean Dashboard
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Monitor oil slicks, temperature changes, and pollution levels using live satellite feeds from NASA and international agencies.
              </p>
              <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-200">
                <span>Explore Dashboard</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Image 2: Simulator Preview */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/30 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group">
            <div className="relative overflow-hidden">
              <img
                src="/assets/moyla.avif"
                alt="Interactive 2D ocean simulator illustrating pollution and temperature"
                className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                Interactive
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-cyan-700 transition-colors duration-200">
                Interactive 2D Ocean Simulator
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Visualize how pollutants spread and how temperature shifts affect marine ecosystems in real-time simulations.
              </p>
              <a
                href="/simulator"
                className="inline-flex items-center text-cyan-600 font-medium hover:text-cyan-700 transition-colors duration-200"
              >
                <span>Explore Simulator</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced CTA Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-800"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-300 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="transform hover:scale-105 transition-all duration-500">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Dive In?</h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Use real-time data and simulations to understand and protect our oceans for future generations.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#explore"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              Explore Dashboard
            </a>
            <a
              href="/simulator"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              Open Simulator
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
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
              <h4 className="text-xl font-bold text-white">INFO</h4>
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
              &copy; 2025. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default Dashboard;