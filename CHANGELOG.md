# Changelog

All notable changes to The Doomsday Signal project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024

### 🎉 Initial Release

The first public release of The Doomsday Signal - an educational visualization of global risk signals.

### ✨ Features

#### Core Functionality
- **Doomsday Clock Visualization**: Beautiful SVG-based clock showing "minutes to midnight" risk level
  - Custom animated clock face with Roman numerals
  - Glowing effects and color transitions based on risk state
  - Smooth transitions between risk levels
  - Historical event markers on clock face

- **Signal Management System**: 
  - Add, track, and remove global tension signals
  - Four signal categories: Geopolitical, Cyber, Media, Strategic
  - Automatic time-based decay modeling
  - Individual signal deletion with confirmation

- **Quick Preset Library**: 20+ curated signal templates
  - Major Treaty Withdrawal
  - Military Exercises Near Border
  - Critical Infrastructure Cyber Attacks
  - Nuclear Rhetoric Escalation
  - Ballistic Missile Tests
  - And many more...

- **Custom Signal Creation**: 
  - User-defined signal descriptions
  - Adjustable impact weights (positive and negative)
  - Category selection
  - Automatic decay rate application

#### User Interface
- **Stats Dashboard**: Real-time metrics display
  - Active signal count
  - Escalation vs de-escalation signals
  - Recent activity (24-hour window)
  
- **Historical Context Panel**: 
  - Cuban Missile Crisis reference (2.0 minutes)
  - Ukraine Invasion reference (3.5 minutes)
  - Post-9/11 Tensions reference (7.0 minutes)
  - End of Cold War reference (11.0 minutes)

- **Signal Feed**: 
  - Scrollable list of active signals
  - Category badges and icons
  - Visual decay progress bars
  - Time elapsed indicators
  - Hover interactions

- **Risk State Indicators**:
  - STABLE (≥10 minutes)
  - ELEVATED (5-9.9 minutes)
  - SEVERE (2-4.9 minutes)
  - CRITICAL (<2 minutes)

#### Design & Polish
- **Cold War Command Center Aesthetic**:
  - Deep military blacks and charcoals
  - Phosphor green CRT terminal glow
  - IBM Plex Sans, IBM Plex Serif, Fira Code typography
  - Monospace tabular numerals
  - Subtle scanline effects

- **Animations**:
  - Smooth clock hand movements
  - Fade in/out for signals
  - Pulsing effects for critical states
  - Hover state transitions
  - Loading animations

- **Accessibility**:
  - WCAG AA compliant color contrasts
  - Semantic HTML structure
  - ARIA labels for interactive elements
  - Keyboard navigation support

#### Technical Features
- **Data Persistence**: 
  - Browser-based storage via Spark KV API
  - Automatic state recovery on page reload
  - No external servers or APIs

- **Time Decay System**: 
  - Exponential decay formula implementation
  - Configurable decay rates per signal type
  - Automatic cleanup of expired signals (<5% impact)

- **Risk Calculation Engine**:
  - Transparent scoring methodology
  - Weighted signal aggregation
  - Minutes-to-midnight conversion
  - Risk state classification

- **Responsive Design**:
  - Mobile-optimized layouts
  - Touch-friendly interactions
  - Adaptive typography scaling
  - Collapsible sections on small screens

#### Documentation
- Comprehensive README with usage guide
- Detailed PRD (Product Requirements Document)
- SECURITY.md for responsible disclosure
- MIT License
- Educational disclaimers throughout

### 🛠️ Technical Stack
- React 19 + TypeScript
- Vite 7 build system
- Tailwind CSS 4 styling
- shadcn/ui v4 component library
- Framer Motion animations
- Phosphor Icons
- Sonner toast notifications
- Web Audio API for sound effects

### 📝 Notes
- This is an educational project for demonstration purposes only
- No real-world risk assessment functionality
- All signals are fictional or derived from public sources
- Zero external API dependencies
- Fully client-side application

---

## Future Roadmap

### Under Consideration
- **Enhanced Presets**: Additional historical scenarios
- **Export Functionality**: Share scenarios as JSON
- **Alternative Views**: Timeline mode, network graph visualization
- **Advanced Decay Models**: Category-specific decay curves
- **Multi-language Support**: Internationalization
- **Collaborative Features**: Share and import scenarios
- **Audio Alerts**: Optional sound notifications for state changes
- **Data Visualization**: Charts showing signal history over time

### Known Limitations
- No mobile app (web-only)
- Browser localStorage has size limits (~5-10MB)
- No server-side synchronization
- Single-user experience only

---

**For detailed technical implementation, see [PRD.md](PRD.md)**

**For security concerns, see [SECURITY.md](SECURITY.md)**
