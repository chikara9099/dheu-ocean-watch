import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Simulator from './pages/Simulator';
import Team from './pages/Team';


function Home() {
  return (
    <div className="font-sans text-gray-800 leading-relaxed">
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

      {/* Hero Section with Video Background */}
      <section
        className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden"
        style={{ clipPath: 'inset(0)' }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
        >
          <source src="/assets/banner.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-30 transition-all duration-500"></div>

        <div className="relative z-10 container mx-auto px-4 transform hover:scale-105 transition-all duration-500">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-pulse hover:animate-none">
            DHEU Ocean Watch
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto opacity-90 hover:opacity-100 transition-opacity duration-300">
            Monitor ocean health with real-time data, news updates, and interactive simulations.
          </p>
          <p className="text-sm md:text-base opacity-80 mb-8 max-w-xl mx-auto hover:opacity-100 transition-opacity duration-300">
            Tracking ocean health with real-time data and educational insights from global sources.
          </p>
          <a
            href="#explore"
            className="inline-block bg-blue-600 hover:bg-blue-700 hover:shadow-xl text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
          >
            Explore Now
          </a>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
          <p className="text-white text-xs mt-2 opacity-70">Scroll Down</p>
        </div>
      </section>

      {/* Main Content Grid Section */}
      <main id="explore" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ocean Health Monitoring</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and data to understand and protect our ocean ecosystems
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src="/assets/science.avif"
                    alt="A diverse team collaborating in front of screens showing ocean data"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                  Real-Time Data Dashboard
                </h3>
                <p className="text-gray-600">
                  Track oil slicks, temperature, and chemical levels with live data from NASA and other agencies.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src="/assets/simulator.avif"
                    alt="Digital dashboard displaying real-time ocean health indicators"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                  Ocean Simulations
                </h3>
                <p className="text-gray-600">
                  Explore a 2D ocean simulator visualizing pollution, temperature, and chemical data interactively.
                </p>
              </div>
            </div>

            {/* Center Column - Featured */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border-2 border-blue-100">
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src="/assets/satelite.avif"
                    alt="Satellite image showing colorful ocean temperature variations"
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                  Temperature & Pollution Maps
                </h3>
                <p className="text-gray-600">
                  A digital map displaying ocean pollution and temperature data overlays.
                </p>
                <div className="mt-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Featured
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src="/assets/ocean1.avif"
                    alt="Aerial view of a vast ocean with gentle waves under sunlight"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                  Live Ocean Monitoring
                </h3>
                <p className="text-gray-600">
                  Aggregated news from multiple portals highlighting current ocean-related events and issues.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src="/assets/ocean2.avif"
                    alt="Close-up of floating plastic debris on a calm sea surface"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                  Pollution Alerts
                </h3>
                <p className="text-gray-600">
                  Stay updated on marine debris, oil spills, and microplastic concentrations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src="/assets/ocean3.avif"
                    alt="Illustration of an oil slick spreading across a coastal area"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                  Environmental Threats
                </h3>
                <p className="text-gray-600">
                  Illustrations and models showing impact zones and ecological risks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Meet the SARgonautes Section - Separate and Formal */}
      <section className="py-20 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the SARgonauts</h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              Our dedicated team of researchers and enthusiasts committed to advancing ocean health monitoring
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className="text-2xl font-semibold mb-4 text-slate-100">
                    Expert Ocean Health Insights
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Our multidisciplinary team combines marine biology expertise with cutting-edge technology 
                    to deliver comprehensive ocean health assessments. We collaborate with international 
                    research institutions to provide accurate, real-time environmental data.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-slate-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span>Marine Environmental Analysis</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span>Satellite Data Integration</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span>Climate Impact Research</span>
                    </div>
                  </div>
                  <div className="mt-8">
                    <a
                      href="/team"
                      className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      Learn More About Our Team
                    </a>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src="/assets/ocean4.avif"
                        alt="Team of scientists analyzing ocean data on computer screens"
                        className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-gray-600 text-lg">Reach out to Team SARgonauts for ocean health insights.</p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-slate-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 backdrop-blur-sm border border-blue-100/50">
              <form className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    Your Message*
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Write your message here"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Ocean Image */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/assets/ocean7.avif"
                  alt="Serene ocean view with gentle waves"
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
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
  );
}

function App() {
  return (
    <Router>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/simulator" element={<Simulator />} />
  <Route path="/team" element={<Team />} />
      </Routes>
    </Router>
  );
}

export default App;