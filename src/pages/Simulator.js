import React, { useEffect, useState } from 'react';
import OceanTimeline from '../components/OceanTimeline';

export default function Simulator() {
  const [activeTab, setActiveTab] = useState('simulator');

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenContent, setFullscreenContent] = useState(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);

  const simulatorSections = [
    {
      id: 'oil-slick',
      title: 'Oil Slick Detection',
      description: 'Real-time monitoring of oil spill incidents across global waters',
      currentImage: '/assets/oil.jpg',
      status: 'Active Monitoring',
      alerts: 3,
      coverage: '89%',
    },
    {
      id: 'temperature',
      title: 'Sea Surface Temperature',
      description: 'Tracking thermal changes and their impact on marine ecosystems',
      currentImage: '/assets/sea.jpeg',
      status: '↑ 1.2°C Above Normal',
      alerts: 7,
      coverage: '94%',
    },
    {
      id: 'waste',
      title: 'Waste Accumulation',
      description: 'Monitoring plastic debris and marine pollution hotspots',
      currentImage: '/assets/waste.jpeg',
      status: '+15% This Month',
      alerts: 12,
      coverage: '76%',
    }
  ];

  // TIME LAPSE MILTESE NA
  const timelapseFrames = {
    'oil-slick': [
      { label: "Jan 2024", status: "2 Minor Spills", severity: "low", image: "/assets/oil.jpg" },
      { label: "Apr 2024", status: "5 Active Leaks", severity: "medium", image: "/assets/random.jpeg" },
      { label: "Jul 2024", status: "8 Major Incidents", severity: "high", image: "" },
      { label: "Oct 2024", status: "12 Critical Zones", severity: "critical", image: "/assets/some.jpeg" },
      { label: "Dec 2024", status: "15 Emergency Areas", severity: "emergency", image: "/assets/hack.jpeg" },
    ],
    'temperature': [
      { label: "Jan 2024", status: "+0.2°C", severity: "low", image: "" },
      { label: "Apr 2024", status: "+0.6°C", severity: "medium", image: "" },
      { label: "Jul 2024", status: "+1.1°C", severity: "high", image: "" },
      { label: "Oct 2024", status: "+1.8°C", severity: "critical", image: "" },
      { label: "Dec 2024", status: "+2.3°C", severity: "emergency", image: "" },
    ],
    'waste': [
      { label: "Jan 2024", status: "5% Increase", severity: "low", image: "" },
      { label: "Apr 2024", status: "12% Increase", severity: "medium", image: "" },
      { label: "Jul 2024", status: "28% Increase", severity: "high", image: "" },
      { label: "Oct 2024", status: "45% Increase", severity: "critical", image: "" },
      { label: "Dec 2024", status: "67% Increase", severity: "emergency", image: "" },
    ]
  };

  // Data thresholds
  const dataThresholds = [
    {
      category: 'Oil Spill Detection',
      thresholds: [
        { level: 'Safe', range: '0-5 incidents/month', color: 'from-green-400 to-green-600', status: 'Normal operations' },
        { level: 'Caution', range: '6-15 incidents/month', color: 'from-yellow-400 to-orange-500', status: 'Increased monitoring' },
        { level: 'Warning', range: '16-30 incidents/month', color: 'from-orange-500 to-red-500', status: 'Alert systems active' },
        { level: 'Critical', range: '30+ incidents/month', color: 'from-red-500 to-red-700', status: 'Emergency protocols' }
      ]
    },
    {
      category: 'Sea Surface Temperature',
      thresholds: [
        { level: 'Normal', range: '±0.5°C from baseline', color: 'from-blue-400 to-blue-600', status: 'Ecosystem stable' },
        { level: 'Elevated', range: '+0.5°C to +1.0°C', color: 'from-yellow-400 to-orange-500', status: 'Marine life adapting' },
        { level: 'High', range: '+1.0°C to +2.0°C', color: 'from-orange-500 to-red-500', status: 'Coral bleaching risk' },
        { level: 'Extreme', range: '+2.0°C and above', color: 'from-red-500 to-red-700', status: 'Ecosystem disruption' }
      ]
    },
    {
      category: 'Marine Waste Accumulation',
      thresholds: [
        { level: 'Minimal', range: '0-10% increase/year', color: 'from-green-400 to-green-600', status: 'Cleanup effective' },
        { level: 'Moderate', range: '11-25% increase/year', color: 'from-yellow-400 to-orange-500', status: 'Monitoring required' },
        { level: 'Severe', range: '26-50% increase/year', color: 'from-orange-500 to-red-500', status: 'Intervention needed' },
        { level: 'Critical', range: '50%+ increase/year', color: 'from-red-500 to-red-700', status: 'Emergency cleanup' }
      ]
    }
  ];

  // Auto-increment time-lapse
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentFrame(f => (f + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Fullscreen done
  const enterFullscreen = (content) => {
    setFullscreenContent(content);
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
    setFullscreenContent(null);
    document.body.style.overflow = 'auto';
  };

  // Escape key back
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        exitFullscreen();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'from-green-400 to-green-600',
      medium: 'from-yellow-400 to-orange-500',
      high: 'from-orange-500 to-red-500',
      critical: 'from-red-500 to-red-700',
      emergency: 'from-red-700 to-red-900'
    };
    return colors[severity] || 'from-gray-400 to-gray-600';
  };

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

      {/* Main Content */}
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white pt-8 pb-16">
        <div className="container mx-auto px-6 max-w-7xl">

          {/* Hero Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Interactive Ocean <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">Simulator</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Explore marine dynamics through real-time data visualization and environmental monitoring systems.</p>
          </section>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {[
              { id: 'simulator', label: 'Live Simulator', desc: 'Real-time Ocean Monitoring' },
              { id: 'timelapse', label: 'Time-Lapse Analysis', desc: 'Historical Environmental Trends' },
              { id: 'thresholds', label: 'Data Thresholds', desc: 'Critical Level Indicators' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group px-6 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="text-left">
                  <div className="font-semibold text-lg">{tab.label}</div>
                  <div className="text-sm opacity-80">{tab.desc}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="relative">

            {/* Simulator Tab */}
            {activeTab === 'simulator' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {simulatorSections.map(section => (
                  <div
                    key={section.id}
                    className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer transform hover:scale-[1.02]"
                    onClick={() => enterFullscreen(`simulator-${section.id}`)}
                  >
                    {/* Image Section - Much Larger */}
                    <div className="relative overflow-hidden">
                      <img 
                        src={section.currentImage} 
                        alt={section.title}
                        className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute top-6 left-6 flex items-center gap-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                        <span className="text-white font-semibold bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">Live</span>
                      </div>
                      <div className="absolute top-6 right-6">
                        <span className="text-5xl drop-shadow-lg">{section.icon}</span>
                      </div>
                      
                      {/* Bottom overlay with key info */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 text-white">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-bold text-lg">{section.title}</div>
                              <div className="text-sm opacity-90">{section.status}</div>
                            </div>
                            <div className="text-right">
                              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                {section.alerts} Alerts
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{section.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{section.description}</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-sm">Status</span>
                          <span className="font-semibold text-gray-800">{section.status}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-sm">Active Alerts</span>
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">{section.alerts}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-sm">Coverage</span>
                          <span className="text-blue-600 font-semibold">{section.coverage}</span>
                        </div>
                      </div>

                      <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-xl transition-colors duration-200 font-medium">
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Time-lapse Tab */}
            {activeTab === 'timelapse' && (
              <div className="space-y-8">
                <OceanTimeline />
              </div>
            )}

            {/* Data Thresholds Tab */}
            {activeTab === 'thresholds' && (
              <div 
                className="space-y-8 cursor-pointer"
                onClick={() => enterFullscreen('thresholds')}
              >
                {dataThresholds.map(category => (
                  <div key={category.category} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-3xl">{category.icon}</span>
                      <h3 className="text-2xl font-bold text-gray-800">{category.category}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {category.thresholds.map((threshold, i) => (
                        <div
                          key={i}
                          className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          <div className={`bg-gradient-to-br ${threshold.color} p-6 text-white h-full`}>
                            <div className="mb-4">
                              <h4 className="text-xl font-bold mb-2">{threshold.level}</h4>
                              <p className="text-sm opacity-90 font-medium">{threshold.range}</p>
                            </div>
                            <div className="text-xs opacity-80 bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                              {threshold.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                
                <a
                  href="https://www.youtube.com/channel/UCrLyIFFhj4Z09ivz6zajTYw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                  title="YouTube"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path fill="white" d="M22.05 7.74a2.91 2.91 0 0 0-2.06-2.06C18.25 5 12 5 12 5s-6.25 0-7.99.68a2.91 2.91 0 0 0-2.06 2.06C2 9.5 2 12 2 12s0 2.5.08 4.26a2.91 2.91 0 0 0 2.06 2.06c1.74.68 7.99.68 7.99.68s6.25 0 7.99-.68a2.91 2.91 0 0 0 2.06-2.06C22 14.5 22 12 22 12s0-2.5-.08-4.26z"/>
                    <path fill="#334155" d="m9.7 15.51 5.38-3.09-5.38-3.09v6.18z"/>
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

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-0 backdrop-blur-sm"
          onClick={exitFullscreen}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-screen h-screen overflow-y-auto relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={exitFullscreen}
              className="fixed top-6 right-6 z-10 w-12 h-12 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110"
            >
              ×
            </button>

            <div className="p-8 md:p-12">
              {/* Fullscreen content based on type */}
              {fullscreenContent?.startsWith('simulator-') && (
                <div className="space-y-8">
                  {(() => {
                    const sectionId = fullscreenContent.replace('simulator-', '');
                    const section = simulatorSections.find(s => s.id === sectionId);
                    return (
                      <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                          <span className="text-6xl mb-4 block">{section?.icon}</span>
                          <h2 className="text-4xl font-bold text-gray-800 mb-4">{section?.title}</h2>
                          <p className="text-xl text-gray-600">{section?.description}</p>
                        </div>

                        {/* Main Content Layout - Image Priority */}
                        <div className="space-y-8">
                          {/* Massive Image Display */}
                          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                            <img 
                              src={section?.currentImage} 
                              alt={section?.title}
                              className="w-full h-[70vh] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                            
                            {/* Overlay Info */}
                            <div className="absolute top-8 left-8 flex items-center gap-4">
                              <div className="w-5 h-5 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                              <span className="text-white font-semibold text-lg bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                                Live Monitoring
                              </span>
                            </div>

                            {/* Bottom Overlay with Key Stats */}
                            <div className="absolute bottom-8 left-8 right-8">
                              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 text-white">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                  <div>
                                    <div className="text-sm opacity-80">Status</div>
                                    <div className="font-bold text-lg">{section?.status}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm opacity-80">Active Alerts</div>
                                    <div className="font-bold text-lg text-red-400">{section?.alerts}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm opacity-80">Coverage</div>
                                    <div className="font-bold text-lg text-blue-400">{section?.coverage}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm opacity-80">Last Update</div>
                                    <div className="font-bold text-lg">2 min ago</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Information Panels Below */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="bg-blue-50 rounded-3xl p-8">
                              <h4 className="font-bold text-blue-800 text-xl mb-6">Detection Method</h4>
                              <p className="text-blue-700 leading-relaxed text-lg">
                                Advanced satellite imagery combined with AI-powered analysis enables real-time detection 
                                and tracking of environmental changes across global ocean systems.
                              </p>
                            </div>

                            <div className="bg-yellow-50 rounded-3xl p-8">
                              <h4 className="font-bold text-yellow-800 text-xl mb-6">Current Conditions</h4>
                              <div className="grid grid-cols-2 gap-6">
                                <div>
                                  <span className="text-yellow-600 block text-sm">Wind Speed</span>
                                  <span className="font-bold text-yellow-800 text-xl">15.3 km/h</span>
                                </div>
                                <div>
                                  <span className="text-yellow-600 block text-sm">Wave Height</span>
                                  <span className="font-bold text-yellow-800 text-xl">2.1 m</span>
                                </div>
                                <div>
                                  <span className="text-yellow-600 block text-sm">Visibility</span>
                                  <span className="font-bold text-yellow-800 text-xl">12.5 km</span>
                                </div>
                                <div>
                                  <span className="text-yellow-600 block text-sm">Water Temp</span>
                                  <span className="font-bold text-yellow-800 text-xl">22.4°C</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-green-50 rounded-3xl p-8">
                              <h4 className="font-bold text-green-800 text-xl mb-6">Response Actions</h4>
                              <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                  <span className="text-green-700 text-lg">Monitoring stations activated</span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                  <span className="text-green-700 text-lg">Local authorities notified</span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                  <span className="text-green-700 text-lg">Cleanup crews on standby</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {fullscreenContent?.startsWith('timelapse-') && (
                <div className="space-y-8">
                  {(() => {
                    const sectionKey = fullscreenContent.replace('timelapse-', '');
                    const section = simulatorSections.find(s => s.id === sectionKey);
                    const frames = timelapseFrames[sectionKey];
                    return (
                      <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                          <span className="text-6xl mb-4 block">{section?.icon}</span>
                          <h2 className="text-4xl font-bold text-gray-800 mb-4">{section?.title} Time-Lapse</h2>
                          <p className="text-xl text-gray-600">Historical progression over the past year</p>
                        </div>

                        {/* Large Timeline Display */}
                        <div className="mb-12">
                          {/* Large Display */}
                          <div className="relative overflow-hidden rounded-3xl shadow-2xl mb-8">
                            <img 
                              src={frames[currentFrame]?.image} 
                              alt={frames[currentFrame]?.label}
                              className="w-full h-[60vh] object-cover"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${getSeverityColor(frames[currentFrame]?.severity)} opacity-70`} />
                            
                            {/* Overlay Info */}
                            <div className="absolute top-8 left-8">
                              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 text-white">
                                <div className="text-3xl font-bold mb-2">{frames[currentFrame]?.label}</div>
                                <div className="text-xl opacity-90">{frames[currentFrame]?.status}</div>
                                <div className={`inline-block mt-4 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${getSeverityColor(frames[currentFrame]?.severity)}`}>
                                  {frames[currentFrame]?.severity.toUpperCase()} LEVEL
                                </div>
                              </div>
                            </div>

                            {/* Progress Indicator */}
                            <div className="absolute bottom-8 right-8">
                              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 text-white">
                                <div className="text-sm opacity-80">Frame Progress</div>
                                <div className="text-lg font-bold">{currentFrame + 1} / {frames.length}</div>
                              </div>
                            </div>
                          </div>

                          {/* Timeline Navigation */}
                          <div className="grid grid-cols-5 gap-4">
                            {frames.map((frame, i) => (
                              <div
                                key={i}
                                className={`relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer ${
                                  i === currentFrame
                                    ? 'ring-4 ring-blue-500 shadow-2xl scale-105'
                                    : 'hover:scale-102 shadow-lg opacity-70 hover:opacity-100'
                                }`}
                                onClick={() => setCurrentFrame(i)}
                              >
                                <img 
                                  src={frame.image} 
                                  alt={frame.label}
                                  className="w-full h-24 object-cover"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${getSeverityColor(frame.severity)} opacity-80`} />
                                <div className="absolute inset-0 p-3 flex flex-col justify-end text-white">
                                  <div className="font-semibold text-sm">{frame.label}</div>
                                </div>
                                {i === currentFrame && (
                                  <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-pulse" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Current Frame Details */}
                        <div className="bg-gray-50 rounded-3xl p-8">
                          <h3 className="text-2xl font-bold text-gray-800 mb-6">
                            Detailed Analysis - {frames[currentFrame]?.label}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                              <h4 className="font-semibold text-gray-700 mb-2">Status Change</h4>
                              <p className="text-2xl font-bold text-blue-600">{frames[currentFrame]?.status}</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                              <h4 className="font-semibold text-gray-700 mb-2">Severity Level</h4>
                              <div className={`inline-block px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r ${getSeverityColor(frames[currentFrame]?.severity)}`}>
                                {frames[currentFrame]?.severity.toUpperCase()}
                              </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                              <h4 className="font-semibold text-gray-700 mb-2">Impact Assessment</h4>
                              <p className="text-gray-600">Affecting marine ecosystems and coastal regions</p>
                            </div>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center gap-6 mt-8">
                          <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                          >
                            {isPlaying ? '⏸️ Pause Timeline' : '▶️ Play Timeline'}
                          </button>
                          <div className="text-gray-600 font-medium text-lg">
                            Frame {currentFrame + 1} of {frames.length}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {fullscreenContent === 'thresholds' && (
                <div className="max-w-6xl mx-auto space-y-12">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Environmental Threshold Indicators</h2>
                    <p className="text-xl text-gray-600">Critical level definitions and response protocols</p>
                  </div>

                  {dataThresholds.map(category => (
                    <div key={category.category} className="bg-gray-50 rounded-3xl p-8">
                      <div className="flex items-center gap-6 mb-8">
                        <span className="text-5xl">{category.icon}</span>
                        <h3 className="text-3xl font-bold text-gray-800">{category.category}</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {category.thresholds.map((threshold, i) => (
                          <div
                            key={i}
                            className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                          >
                            <div className={`bg-gradient-to-br ${threshold.color} p-8 text-white h-full min-h-[200px] flex flex-col justify-between`}>
                              <div>
                                <h4 className="text-2xl font-bold mb-4">{threshold.level}</h4>
                                <p className="text-lg opacity-90 font-medium mb-4">{threshold.range}</p>
                              </div>
                              <div className="text-sm opacity-90 bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                                <strong>Response:</strong><br />
                                {threshold.status}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Additional Info */}
                      <div className="mt-8 bg-white rounded-2xl p-6">
                        <h4 className="font-bold text-gray-800 mb-4">Monitoring Protocol</h4>
                        <p className="text-gray-600 leading-relaxed">
                          Continuous monitoring using satellite data, IoT sensors, and AI analysis. 
                          Automated alerts trigger when thresholds are exceeded, enabling rapid response coordination.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(5deg); }
          66% { transform: translateY(5px) rotate(-3deg); }
        }
        
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        @keyframes scroll-fade {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .floating-particle {
          animation: float 6s ease-in-out infinite;
        }
        
        .pulse-dot {
          animation: pulse-dot 2s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .profile-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        
        .profile-card:hover {
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(59, 130, 246, 0.1),
            0 0 30px rgba(59, 130, 246, 0.1);
        }
        
        /* Smooth scroll observer animations */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scroll-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
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
    </>
  );
};