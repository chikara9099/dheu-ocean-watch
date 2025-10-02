import React, { useEffect, useState } from 'react';

const Team = () => {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);
    
    const elementsToObserve = document.querySelectorAll('.scroll-reveal');
    elementsToObserve.forEach(el => observer.observe(el));
    
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      elementsToObserve.forEach(el => observer.unobserve(el));
    };
  }, []);

  const teamMembers = [
    {
      name: "Farhan Labib",
      role: "Some role",
      bio: "Role niye bhekbhek.",
      image: "/assets/fala.jpg", 
    },
    {
      name: "Fatima Sad Sudipta",
      role: "Some role",
      bio: "Role niye bhekbhek.",
      image: "/assets/fss.jpg",
    },
    {
      name: "Shahriar Alam Patwary",
      role: "Some role",
      bio: "Role niye bhekbhek.",
      image: "/assets/sap.png",
    },
    {
      name: "Tasnim Tamal",
      role: "Some role",
      bio: "Role niye bhekbhek.",
      image: "/assets/team-4.avif",
    },
    {
      name: "Md. Sium",
      role: "Some role",
      bio: "Role niye bhekbhek.",
      image: "/assets/sium.png",
    },
    {
      name: "Sourav Sarker",
      role: "Some role",
      bio: "Role niye bhekbhek.",
      image: "/assets/team-6.avif",
    }
  ];

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
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700 brightness-75"
        >
          <source src="/assets/banner.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/40 hover:from-black/30 hover:via-black/40 hover:to-black/30 transition-all duration-500"></div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="animate-fadeIn">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-2xl">
              Meet the SARgonauts
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 hover:opacity-100 transition-opacity duration-300 leading-relaxed">
              The dedicated team behind DHEU, committed to ocean health through innovation and education.
            </p>
            <a
              href="#our-team"
              className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:shadow-2xl text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 shadow-lg"
            >
              Discover Our Story
            </a>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/70 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
            <div className="w-1.5 h-4 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
          <p className="text-white text-sm mt-3 opacity-80 font-medium">Scroll to Explore</p>
        </div>
      </section>

      {/* Main Team Content */}
      <main id="our-team" className="py-24 bg-gradient-to-b from-slate-50 via-blue-50/50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Intro Text */}
          <div className="max-w-5xl mx-auto text-center mb-20">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold py-2 px-6 rounded-full shadow-lg">
                Our Team
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight">
              Who Are the <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">SARgonauts</span>?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              We are a multidisciplinary team of scientists, developers, and educators united by a mission: 
              to protect our oceans through real-time data, advanced simulations, and public awareness.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              By combining satellite radar (SAR) technology with interactive web tools, we empower communities 
              and researchers to understand and respond to marine environmental threats.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="profile-card bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-6 hover:rotate-1 group border border-white/50 hover:border-blue-200/50 relative overflow-hidden"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-24px) scale(1.02)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
                }}
              >
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="floating-particle absolute w-2 h-2 bg-blue-400/30 rounded-full top-4 left-4"></div>
                  <div className="floating-particle absolute w-1.5 h-1.5 bg-cyan-400/40 rounded-full top-8 right-8 animation-delay-1000"></div>
                  <div className="floating-particle absolute w-1 h-1 bg-blue-300/50 rounded-full bottom-12 left-6 animation-delay-2000"></div>
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-transparent to-cyan-400/0 group-hover:from-blue-400/10 group-hover:to-cyan-400/10 transition-all duration-500 rounded-3xl"></div>
                
                <div className="relative z-10">
                  <div className="overflow-hidden rounded-2xl mb-6 aspect-square relative">
                    <img
                      src={member.image || "https://images.unsplash.com/photo-1573496359149-625a47f9c7b5?auto=format&fit=clip&w=600&q=80"}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Profile badge */}
                    <div className="absolute top-3 right-3 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pulse-dot"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-4 text-sm uppercase tracking-wide">
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {member.bio}
                  </p>
                  
                  {/* Minimalist progress indicator */}
                  <div className="mt-6 flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                    <div className="w-8 h-0.5 bg-blue-600 rounded-full"></div>
                    <div className="w-4 h-0.5 bg-blue-400 rounded-full"></div>
                    <div className="w-2 h-0.5 bg-blue-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mission Statement */}
          <div className="mt-32 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white p-12 md:p-16 rounded-3xl shadow-2xl relative overflow-hidden scroll-reveal">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-48 translate-x-48"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-300 rounded-full translate-y-36 -translate-x-36"></div>
            </div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h3>
              <p className="text-xl md:text-2xl opacity-95 leading-relaxed font-light">
                To democratize access to ocean health data by transforming complex satellite observations 
                into intuitive, interactive experiences that inspire action and education worldwide.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-200/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-20">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold py-2 px-6 rounded-full shadow-lg">
                FAQs
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Find answers to common questions about DHEU, our mission, and how we operate.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group scroll-reveal"
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
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/30 via-transparent to-cyan-600/30"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Join Our Mission
          </h2>
          <p className="text-xl md:text-2xl opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Whether you're a researcher, developer, or ocean enthusiast — there's a place for you.
          </p>
          <a
            href="mailto:contact@dheu.example.com"
            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
          >
            Get Involved Today
          </a>
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
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
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

export default Team;