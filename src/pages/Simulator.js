import React, { useRef, useEffect, useState } from 'react';

class DataGenerator {
  constructor() {
    this.regions = {
      bayOfBengal: { lat: [15, 25], lng: [85, 95] },
      gulfOfMexico: { lat: [20, 30], lng: [-95, -85] },
      southChinaSea: { lat: [10, 25], lng: [105, 120] },
      global: { lat: [-60, 60], lng: [-180, 180] }
    };

    this.majorPorts = [
      { name: "Shanghai", lat: 31.2304, lng: 121.4737, country: "China" },
      { name: "Singapore", lat: 1.3521, lng: 103.8198, country: "Singapore" },
      { name: "Rotterdam", lat: 51.9244, lng: 4.4777, country: "Netherlands" },
      { name: "Los Angeles", lat: 33.7701, lng: -118.1937, country: "USA" },
      { name: "Dubai", lat: 25.2048, lng: 55.2708, country: "UAE" },
      { name: "Hamburg", lat: 53.5511, lng: 9.9937, country: "Germany" },
      { name: "Mumbai", lat: 19.076, lng: 72.8777, country: "India" },
      { name: "Hong Kong", lat: 22.3193, lng: 114.1694, country: "Hong Kong" },
      { name: "Busan", lat: 35.1796, lng: 129.0756, country: "South Korea" },
      { name: "New York", lat: 40.6892, lng: -74.0445, country: "USA" }
    ];
  }

  randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  generateOilSpills(count = 50) {
    const spills = [];
    for (let i = 0; i < count; i++) {
      const lat = this.randomInRange(-60, 60);
      const lng = this.randomInRange(-180, 180);
      const severity = Math.random();
      const age = Math.random() * 30;
      const size = Math.random() * 1000 + 100;

      // Create a small polygon (circle approximation) for each spill
      const radius = Math.sqrt(size) / 100; // scale for visualization
      const points = [];
      for (let j = 0; j <= 24; j++) {
        const angle = (2 * Math.PI * j) / 24;
        const dLat = radius * Math.cos(angle);
        const dLng = radius * Math.sin(angle) / Math.cos(lat * Math.PI / 180);
        points.push([lng + dLng, lat + dLat]);
      }

      spills.push({
        id: `spill_${i + 1}`,
        lat,
        lng,
        severity,
        age,
        size,
        detectionDate: new Date(Date.now() - age * 24 * 60 * 60 * 1000),
        confidence: 0.6 + Math.random() * 0.4,
        source: ['Ship accident', 'Pipeline leak', 'Platform spill'][Math.floor(Math.random() * 3)],
        weatherConditions: {
          windSpeed: Math.random() * 30 + 5,
          waveHeight: Math.random() * 5 + 0.5,
          visibility: Math.random() * 10 + 5,
          temperature: Math.random() * 30 + 10
        },
        sarImageId: `SAR_${Math.floor(Math.random() * 1000)}`,
        color: severity > 0.7 ? '#ff0000' : severity > 0.4 ? '#ff8800' : '#ffff00',
        label: `Oil Spill ${i + 1}`,
        // GeoJSON polygon
        polygon: {
          type: 'Polygon',
          coordinates: [points]
        }
      });
    }
    return spills;
  }

  generateTradeRoutes(count = 20) {
    const routes = [];
    const ports = this.majorPorts;

    for (let i = 0; i < count; i++) {
      const startPort = ports[Math.floor(Math.random() * ports.length)];
      let endPort;
      do {
        endPort = ports[Math.floor(Math.random() * ports.length)];
      } while (endPort === startPort);

      routes.push({
        id: `route_${i + 1}`,
        startPort: startPort.name,
        endPort: endPort.name,
        startLat: startPort.lat,
        startLng: startPort.lng,
        endLat: endPort.lat,
        endLng: endPort.lng,
        distance: Math.round(this.calculateDistance(startPort.lat, startPort.lng, endPort.lat, endPort.lng)),
        estimatedTime: Math.round((Math.random() * 20 + 5)),
        riskLevel: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
        cargo: ['Crude Oil', 'Container', 'LNG', 'Chemicals'][Math.floor(Math.random() * 4)],
        frequency: Math.floor(Math.random() * 20) + 1,
        color: { high: '#ff4444', medium: '#ffaa44', low: '#44ff44' }[Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'],
        strokeWidth: 2 + Math.random() * 3
      });
    }
    return routes;
  }

  generateSARCoverage(count = 30) {
    const coverage = [];
    for (let i = 0; i < count; i++) {
      const lat = this.randomInRange(-60, 60);
      const lng = this.randomInRange(-180, 180);
      const swathWidth = 200 + Math.random() * 300;

      // Rectangle polygon for SAR swath
      const poly = this.generatePolygon(lat, lng, swathWidth);

      coverage.push({
        id: `sar_${i + 1}`,
        centerLat: lat,
        centerLng: lng,
        swathWidth,
        length: 400 + Math.random() * 200,
        satellite: ['Sentinel-1A', 'RADARSAT-2', 'TerraSAR-X'][Math.floor(Math.random() * 3)],
        acquisitionTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        resolution: Math.random() * 20 + 5,
        polarization: Math.random() > 0.5 ? 'VV' : 'VH',
        incidenceAngle: 20 + Math.random() * 25,
        orbitDirection: Math.random() > 0.5 ? 'Ascending' : 'Descending',
        // GeoJSON polygon
        polygon: {
          type: 'Polygon',
          coordinates: poly
        },
        quality: 0.7 + Math.random() * 0.3,
        cloudCover: Math.random() * 0.3,
        color: '#ffaa44',
        opacity: 0.6
      });
    }
    return coverage;
  }

  generateMajorPorts() {
    return this.majorPorts.map((port, idx) => ({
      ...port,
      id: `port_${idx + 1}`,
      size: Math.random() * 5 + 2,
      throughput: Math.floor(Math.random() * 50000000) + 1000000,
      type: ['Container', 'Oil Terminal', 'Bulk'][Math.floor(Math.random() * 3)],
      facilities: ['Container Cranes', 'Oil Storage'].slice(0, 1 + Math.floor(Math.random() * 2))
    }));
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  generatePolygon(lat, lng, widthKm) {
    const widthDeg = widthKm / 111;
    const points = [
      [lng - widthDeg / 2, lat - 1],
      [lng + widthDeg / 2, lat - 1],
      [lng + widthDeg / 2, lat + 1],
      [lng - widthDeg / 2, lat + 1],
      [lng - widthDeg / 2, lat - 1]
    ];
    return [points];
  }
}

// === GlobeController (React-compatible version) ===
class GlobeController {
  constructor(globeInstance) {
    this.globe = globeInstance;
    this.oilSpills = [];
    this.tradeRoutes = [];
    this.sarCoverage = [];
    this.ports = [];
    this.currentMode = 'oil-spills';
    this.showLabels = true;
    this.showArcs = true;
    this.pointSize = 0.5;
    this.setupInteractions();
  }

  setupInteractions() {
    this.globe
      .onPointClick((point) => point && this.showDetails(point, 'point'))
      .onArcClick((arc) => arc && this.showDetails(arc, 'arc'))
      .onPolygonClick((polygon) => polygon && this.showDetails(polygon, 'polygon'));
  }

  showDetails(item, type) {
    window.dispatchEvent(new CustomEvent('globe:showDetails', { detail: { item, type } }));
  }

  setOilSpills(spills) {
    this.oilSpills = spills;
    this.updateView();
  }

  setTradeRoutes(routes) {
    this.tradeRoutes = routes;
    this.updateView();
  }

  setSARCoverage(coverage) {
    this.sarCoverage = coverage;
    this.updateView();
  }

  setPorts(ports) {
    this.ports = ports;
    this.updateView();
  }

  setMode(mode) {
    this.currentMode = mode;
    this.updateView();
  }

  updateView() {
    switch (this.currentMode) {
      case 'oil-spills':
        this.renderOilSpills();
        break;
      case 'trade-routes':
        this.renderTradeRoutes();
        break;
      case 'sar-data':
        this.renderSARData();
        break;
      default:
        this.renderOilSpills();
    }
  }

  renderOilSpills() {
    // Defensive: filter only valid polygons and keep mapping to parent oilSpill
    const validPairs = this.oilSpills
      .map(s => ({ polygon: s.polygon, color: s.color, label: s.label, size: s.size }))
      .filter(s => s.polygon && typeof s.polygon === 'object' && s.polygon.type === 'Polygon' && Array.isArray(s.polygon.coordinates));
    this.globe
      .polygonsData(validPairs.map(s => s.polygon))
      .polygonCapColor((d, i) => validPairs[i]?.color || '#ff0000')
      .polygonSideColor((d, i) => validPairs[i]?.color || '#ff0000')
      .polygonStrokeColor('#222')
      .polygonAltitude(0.001)
      .polygonLabel((d, i) => `<b>${validPairs[i]?.label || 'Oil Spill'}</b><br>Size: ${validPairs[i]?.size?.toFixed(0) || '?'} km²`)
      .labelsData(this.showLabels ? this.ports : [])
      .labelLat('lat').labelLng('lng').labelText('name').labelColor('#4444ff')
      .pointsData([]).arcsData([]);
  }

  renderTradeRoutes() {
    this.globe
      .arcsData(this.tradeRoutes)
      .arcStartLat('startLat').arcStartLng('startLng')
      .arcEndLat('endLat').arcEndLng('endLng')
      .arcColor('color').arcStroke(d => d.strokeWidth)
      .arcAltitude(0.005).arcDashLength(0.4).arcDashGap(0.2).arcDashAnimateTime(2000)
      .pointsData(this.ports)
      .pointLat('lat').pointLng('lng').pointColor('#4444ff').pointRadius(0.8)
      .labelsData(this.showLabels ? this.ports : [])
      .labelLat('lat').labelLng('lng').labelText('name').labelColor('#ffffff')
      .polygonsData([]);
  }

  renderSARData() {
    // Defensive: filter only valid polygons and keep mapping to parent sarCoverage
    const validPairs = this.sarCoverage
      .map(s => ({ polygon: s.polygon, color: s.color, satellite: s.satellite }))
      .filter(s => s.polygon && typeof s.polygon === 'object' && s.polygon.type === 'Polygon' && Array.isArray(s.polygon.coordinates));
    this.globe
      .polygonsData(validPairs.map(s => s.polygon))
      .polygonCapColor((d, i) => validPairs[i]?.color || '#ffaa44')
      .polygonSideColor((d, i) => validPairs[i]?.color || '#ffaa44')
      .polygonStrokeColor('#fff')
      .polygonAltitude(0.05)
      .polygonLabel((d, i) => `SAR: ${validPairs[i]?.satellite || ''}`)
      .pointsData(this.oilSpills.slice(0, 10))
      .pointLat('lat').pointLng('lng').pointColor('#ff4444').pointRadius(0.5)
      .arcsData([]).labelsData([]);
  }
}

// === UIController (Modal handler) ===
const showDetailModal = (item, type) => {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4';
  modal.innerHTML = `
    <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-96 overflow-y-auto border">
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-xl font-bold text-gray-800">${type === 'point' ? 'Oil Spill' : type === 'arc' ? 'Trade Route' : 'SAR Coverage'}</h3>
          <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <div class="text-gray-600 space-y-2 text-sm">
          ${Object.entries(item)
            .filter(([key]) => !['geometry', 'waypoints', 'coverage'].includes(key))
            .map(([key, value]) => {
              if (value instanceof Date) value = value.toLocaleString();
              return `<p><strong>${key}:</strong> ${value}</p>`;
            })
            .join('')}
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
};

export default function Simulator() {
  const globeEl = useRef(null);
  const [mode, setMode] = useState('oil-spills');
  const controllerRef = useRef(null);

  useEffect(() => {
    // Load globe.gl dynamically
    const loadGlobe = async () => {
      const World = (await import('globe.gl')).default;
      const generator = new DataGenerator();

      const world = World()(globeEl.current)
        .backgroundColor('#0d141a')
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png');

      const controller = new GlobeController(world);
      controllerRef.current = controller;

      // Generate initial data
      const oilSpills = generator.generateOilSpills(30);
      const tradeRoutes = generator.generateTradeRoutes(15);
      const sarCoverage = generator.generateSARCoverage(20);
      const ports = generator.generateMajorPorts();

      controller.setOilSpills(oilSpills);
      controller.setTradeRoutes(tradeRoutes);
      controller.setSARCoverage(sarCoverage);
      controller.setPorts(ports);
      controller.setMode(mode);

      // Listen for detail events
      window.addEventListener('globe:showDetails', (e) => {
        const { item, type } = e.detail;
        showDetailModal(item, type);
      });

      return () => {
        window.removeEventListener('globe:showDetails', () => {});
      };
    };

    loadGlobe();
  }, []);

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.setMode(mode);
    }
  }, [mode]);

  return (
    <>
      {/* Header / Navbar */}
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

      {/* Main Content */}
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
        <section className="container mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Interactive Ocean
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {" "}
                Simulator
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Visualize oil spills, maritime trade routes, and SAR satellite
              coverage in real time with our advanced 3D globe interface.
            </p>
          </div>

          {/* Mode Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { id: "oil-spills", label: "Oil Spill Detection", icon: "🛢️" },
              { id: "trade-routes", label: "Maritime Routes", icon: "🚢" },
              { id: "sar-data", label: "SAR Coverage", icon: "🛰️" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setMode(btn.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-3 ${
                  mode === btn.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md"
                }`}
              >
                <span className="text-lg">{btn.icon}</span>
                {btn.label}
              </button>
            ))}
          </div>

          {/* Globe Container */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border">
            <div
              ref={globeEl}
              style={{
                width: "100%",
                height: "600px",
                background: "#0d141a",
              }}
            />
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-2xl mb-3">🛢️</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Oil Spill Detection
              </h3>
              <p className="text-gray-600 text-sm">
                Real-time monitoring and visualization of oil spills detected
                through satellite imagery and SAR data analysis.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-2xl mb-3">🚢</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Maritime Trade Routes
              </h3>
              <p className="text-gray-600 text-sm">
                Explore major shipping lanes and trade corridors connecting
                ports worldwide with cargo and risk assessments.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-2xl mb-3">🛰️</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                SAR Satellite Coverage
              </h3>
              <p className="text-gray-600 text-sm">
                View synthetic aperture radar coverage areas and acquisition
                patterns for comprehensive ocean monitoring.
              </p>
            </div>
          </div>
        </section>
      </main>

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
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                  title="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.983h-1.5c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                  title="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* Twitter/X */}
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                  title="X (Twitter)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* DHEU Ocean Watch Info */}
            <div className="space-y-4 text-center">
              <h4 className="text-xl font-bold">DHEU Ocean Watch</h4>
              <p className="text-gray-400 text-sm">
                Protecting our oceans through data.
              </p>
            </div>

            {/* Newsletter Section */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">INFO</h4>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-300 mb-2 block">
                    Your Email Address
                  </span>
                  <input
                    type="email"
                    placeholder="Enter email here"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all duration-300 hover:bg-slate-700/70"
                  />
                </label>
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
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
    </>
  );
}