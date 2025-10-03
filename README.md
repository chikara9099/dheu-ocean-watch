# DHEU Ocean Watch 🌊

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://cute-lolly-3e76dc.netlify.app/)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)


> **World's First Ocean Health Broadcast System** - A real-time ocean monitoring platform that transforms satellite data into actionable intelligence for marine conservation.

**Live Demo:** [https://cute-lolly-3e76dc.netlify.app/](https://cute-lolly-3e76dc.netlify.app/)

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Core Features](#core-features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Testing](#testing)
- [Deployment](#deployment)
- [NASA Space Apps Challenge 2025](#nasa-space-apps-challenge-2025)
- [Impact & Vision](#impact--vision)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

## Overview

DHEU Ocean Watch is an advanced web-based platform developed for the **NASA Space Apps Challenge 2025** under the challenge theme: *"Through the Radar Looking Glass: Revealing Earth Processes with SAR"*. The system leverages Synthetic Aperture Radar (SAR) data and multi-source satellite imagery to provide comprehensive, real-time ocean health monitoring and environmental accountability.

By integrating data from NASA Earth, MODIS, and ASF, DHEU Ocean Watch quantifies ocean health through a proprietary metric,the **SARgonauts Index**- enabling researchers, policymakers, and citizens to track marine environmental conditions with unprecedented accessibility and precision.

### Mission Statement

We are not just monitoring the ocean, we are giving it a voice. DHEU Ocean Watch serves as the bridge between the silent suffering of marine ecosystems and the urgent need for global awareness and action.

## Problem Statement

Marine ecosystems face critical threats from pollution, climate change, and human activity. Current monitoring systems suffer from:

- **Limited Accessibility**: Complex scientific data remains confined to research institutions
- **Delayed Response**: Environmental incidents often go undetected until irreversible damage occurs
- **Accountability Gap**: Lack of public transparency in marine environmental governance
- **Data Fragmentation**: Multiple data sources exist without unified interpretation
- **Communication Barrier**: Scientific findings fail to reach policymakers and the general public effectively

### The Reality We Face

Marine waste is choking our seas. Oil slicks are poisoning marine life. Temperature and salinity levels are rising, disrupting ecosystems from surface to depths. Yet accountability remains absent, and action is delayed until damage becomes irreversible.

DHEU Ocean Watch addresses these challenges by democratizing ocean health data and enabling immediate public awareness and policy response.

## Core Features

### 1. **Home - Mission Gateway**
Provides visitors with a comprehensive understanding of our mission, the urgency of ocean conservation, and the technological approach we employ to monitor and protect marine environments.

### 2. **Dashboard - Real-Time Ocean Health Monitoring**
The beating heart of our system, featuring:

- **SARgonauts Index**: Proprietary scoring system (0-100) integrating seven critical parameters:
  - Sea level anomalies
  - Ocean color indices
  - Wave frequency patterns
  - Oil slick detection
  - Marine waste accumulation
  - Salinity variations
  - Sea surface height deviations
- Regional analysis with granular geographic resolution
- Historical trend visualization and comparative analytics
- Instant health status classification for any monitored region

### 3. **Simulator - Environmental Impact Visualization**
Where science meets storytelling:

- Interactive time-lapse simulations demonstrating environmental changes
- Coral bleaching prediction models based on temperature anomalies
- Ocean current disruption analysis from salinity changes
- Live simulations showing data in action
- Intuitive severity scaling with actionable thresholds
- Visual demonstration of how "bad" becomes "catastrophic"

### 4. **Updates - Advocacy and Action Platform**
Transforming data into action:

- Automated generation of policy recommendations aligned with UNDP and FAO frameworks
- Region-specific open letters to governmental authorities and policymakers
- Social media integration for public accountability campaigns
- Evidence-based documentation for environmental incidents
- Direct pressure mechanisms for authorities through user-shared content
- Conditional content generation: celebratory messages for good indices, urgent action plans for concerning data

### 5. **DheuKids - Educational Outreach**
Educating the next generation:

- Age-appropriate content explaining ocean conservation principles
- Simple, engaging explanations of why oceans matter
- Interactive learning modules for young environmental stewards
- Accessible scientific concepts for children

### 6. **Team Section**
Meet the minds behind the mission—introducing Team SARgonauts, the team that bridges the gap between marine ecosystem data and global awareness.

## Technology Stack

### Frontend Technologies

```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^6.30.1",
  "framer-motion": "^12.23.22",
  "lucide-react": "^0.544.0"
}
```

**Key Technologies:**

- **React 19.1.1** - Modern component-based architecture with latest features
- **React Router DOM 6.30.1** - Seamless client-side routing and navigation
- **Framer Motion 12.23.22** - Advanced animation library for smooth, engaging transitions
- **Lucide React 0.544.0** - Comprehensive, customizable icon library

### Styling & Build Tools

```json
{
  "tailwindcss": "3.4.3",
  "postcss": "^8.5.6",
  "autoprefixer": "^10.4.21",
  "react-scripts": "^5.0.1"
}
```

- **Tailwind CSS 3.4.3** - Utility-first CSS framework for rapid, responsive design
- **PostCSS & Autoprefixer** - CSS processing and cross-browser compatibility
- **Create React App** - Zero-configuration build toolchain

### Testing Infrastructure

```json
{
  "@testing-library/react": "^16.3.0",
  "@testing-library/jest-dom": "^6.8.0",
  "@testing-library/user-event": "^13.5.0",
  "@testing-library/dom": "^10.4.1"
}
```

### Data Sources & Integration

- **NASA Earth Observations** - Comprehensive satellite imagery and environmental monitoring data
- **MODIS** (Moderate Resolution Imaging Spectroradiometer) - Ocean color, temperature, and chlorophyll concentration
- **MADOS** (Marine Debris Observation System) - Waste accumulation tracking and debris mapping: for basic idea
- **ASF** (Alaska Satellite Facility) - SAR data processing and radar imagery analysis

### Backend Proxy Configuration

```json
{
  "proxy": "http://localhost:8000"
}
```

The application is configured to communicate with a backend server for data processing and API integration.

## Installation

### Prerequisites

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher)
- **Git** for version control

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/yourusername/dheu-ocean-watch.git

# Navigate to project directory
cd dheu-ocean-watch

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:3000`

### Available Scripts

```bash
# Start development server with hot reloading
npm start

# Build optimized production bundle
npm run build

# Run test suite
npm test

# Eject from Create React App (one-way operation)
npm run eject
```

## Testing

### Running Tests

```bash
# Run test suite in interactive watch mode
npm test

# Run tests with coverage report
npm test -- --coverage

# Run tests in CI environment
CI=true npm test
```

### Testing Configuration

The project uses Jest and React Testing Library for comprehensive testing:

- **Unit Tests**: Component logic and utility functions
- **Integration Tests**: Component interactions and data flow
- **DOM Tests**: User interactions and accessibility

### Browser Support

**Development:**
- Latest Chrome version
- Latest Firefox version
- Latest Safari version

## Deployment

### Netlify Deployment (Recommended)

The application is optimized for deployment on Netlify:

```bash
# Build production bundle
npm run build

# The build/ directory is ready for deployment
```

**Netlify Configuration:**

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Manual Deployment

```bash
# Build optimized production bundle
npm run build

# Deploy build/ directory to your hosting service
# (Vercel, AWS S3, GitHub Pages, etc.)
```

**Build Settings:**
- `CI=false` flag is configured to prevent warnings from blocking builds
- Optimized bundle with code splitting
- Source maps enabled for debugging

## NASA Space Apps Challenge 2025

**Challenge Theme:** Through the Radar Looking Glass: Revealing Earth Processes with SAR  
**Team Name:** SARgonauts  
**Challenge Year:** 2025  
**Category:** Ocean & Water Resources

### Challenge Alignment

DHEU Ocean Watch directly addresses the challenge by:

1. **Leveraging SAR Technology**: Utilizing Synthetic Aperture Radar data for all-weather, day-night ocean monitoring
2. **Revealing Earth Processes**: Visualizing complex oceanographic phenomena through intuitive interfaces
3. **Real-World Impact**: Creating actionable tools for marine conservation and policy advocacy
4. **Innovation**: Introducing the SARgonauts Index as a novel ocean health quantification method
5. **Accessibility**: Democratizing complex satellite data for diverse user groups

## Impact & Vision

### Current Impact

DHEU Ocean Watch provides:

1. **Data Democratization**: Making scientific monitoring accessible to global audiences
2. **Rapid Response Capability**: Early warning systems for environmental incidents
3. **Policy Advocacy Tools**: Evidence-based frameworks for marine protection
4. **Environmental Education**: Building ocean literacy across generations
5. **Accountability Infrastructure**: Transparent, verifiable records of ocean health

### Long-Term Vision

We envision a world where:

- **No marine waste goes unnoticed**
- **No policymaker can ignore environmental data**
- **Ocean health is tracked, broadcast, and protected in real-time**
- **Citizens have the tools to demand environmental accountability**
- **The ocean's voice is finally heard**

### Measurement of Success

- Number of environmental incidents detected and reported
- Policy changes influenced by platform data
- User engagement and social media reach
- Educational content consumption metrics
- Geographic coverage of monitoring systems

## Contributing

We welcome contributions from the community. To contribute:

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

### Areas for Contribution

- **Data Integration**: Adding new satellite data sources
- **Visualization**: Enhancing interactive elements and graphics
- **Machine Learning**: Improving predictive models
- **Accessibility**: Ensuring platform usability for all users
- **Localization**: Translating content for global reach
- **Documentation**: Improving technical and user documentation


## Acknowledgments

### Data Providers

- **NASA Earth Observations** - Comprehensive satellite imagery and environmental data
- **MODIS Team** - Ocean color and temperature monitoring systems
- **MADOS** - Marine debris observation and tracking
- **Alaska Satellite Facility (ASF)** - SAR data processing infrastructure

### Frameworks & Organizations

- **NASA Space Apps Challenge** - Platform and challenge framework
- **United Nations Development Programme (UNDP)** - Marine conservation policy frameworks
- **Food and Agriculture Organization (FAO)** - Sustainable fisheries guidelines
- **Open-source Community** - Exceptional libraries and development tools

## Contact

For inquiries, collaboration opportunities, or technical support:

- **Live Platform:** [https://cute-lolly-3e76dc.netlify.app/](https://cute-lolly-3e76dc.netlify.app/)
- **GitHub Repository:** [https://github.com/yourusername/dheu-ocean-watch](https://github.com/yourusername/dheu-ocean-watch)
- **Issue Tracker:** [GitHub Issues](https://github.com/yourusername/dheu-ocean-watch/issues)
- **Project Email:** dheunsac@gmail.com

---

## Project Status

**Active Development** | **NASA Space Apps Challenge 2025** | **Ocean Conservation**

---

**DHEU Ocean Watch** - *Saving Our Oceans, One Data Point at a Time* 

*We are Team SARgonauts. We are the ones who saw the problem and refused to look away. And we are the ones who will make sure the ocean's voice is heard.*

---

**Last Updated:** October 2025  
**Version:** 0.1.0  
**Maintainer:** Team SARgonauts