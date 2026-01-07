# The Doomsday Signal

A symbolic, data-inspired visualization that aggregates fictional global tension signals into a transparent "minutes to midnight" risk indicator. This educational project demonstrates signal aggregation, time decay modeling, and transparent risk assessment methodologies.

> 📸 **Screenshots**: To add screenshots to this README, follow the guide in [docs/SCREENSHOTS.md](./docs/SCREENSHOTS.md)

## 🎯 Purpose

The Doomsday Signal is an **educational and artistic exploration** of how we conceptualize and visualize global risk. It demonstrates:

- **Signal Aggregation**: How multiple geopolitical, cyber, media, and strategic events combine into composite risk scores
- **Time Decay Modeling**: How the relevance of historical events diminishes over time in risk assessment
- **Transparent Methodology**: Every calculation is visible and traceable, building trust through radical openness
- **Systems Thinking**: Understanding how different types of events interconnect and escalate

> ⚠️ **Important**: This application simulates global risk signals for educational purposes only. It does not predict real-world events, use classified intelligence, or provide actionable security assessments. All data is fictional or derived from public sources.

## ✨ Features

### 📊 Dynamic Doomsday Clock
A beautifully animated clock visualization that displays "minutes to midnight" based on aggregated signal scores. The clock updates in real-time as signals are added, decay, or expire.

### 📡 Signal Feed
Track active geopolitical, cyber, media, and strategic signals with:
- Category badges and icons
- Impact weights (positive for escalation, negative for de-escalation)
- Time elapsed since signal creation
- Visual decay progress indicators
- Individual signal deletion

### ⚡ Quick Preset Library
Choose from **20+ curated signal presets** across four categories:
- **Geopolitical**: Treaty withdrawals, military exercises, sanctions, diplomatic talks
- **Cyber**: Infrastructure attacks, government breaches, DDoS campaigns, election interference
- **Media**: Nuclear rhetoric, propaganda spikes, disinformation campaigns
- **Strategic**: Missile tests, nuclear tests, military readiness changes, ceasefire agreements

Each preset includes realistic impact weights and historically-informed decay rates.

### ✏️ Custom Signal Creation
Create your own signals to explore different scenarios:
- Select signal category
- Write custom descriptions
- Set impact weights (positive or negative)
- Automatic time decay modeling

### 📈 Real-Time Statistics
Track key metrics at a glance:
- Total active signals
- Escalation signals count
- De-escalation signals count
- Signals added in last 24 hours

### 📚 Historical Context
Compare current risk levels to historical events:
- Cuban Missile Crisis (2.0 minutes)
- Ukraine Invasion (3.5 minutes)
- Post-9/11 Tensions (7.0 minutes)
- End of Cold War (11.0 minutes)

## 🚀 Getting Started

**Quick Start:** See [docs/QUICKSTART.md](./docs/QUICKSTART.md) for a 5-minute setup guide.

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd spark-template

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🎨 Design Philosophy

The interface evokes **Cold War-era command centers** and **military bunker terminals**—deep blacks, phosphor green CRT glow, and stark monospace typography. The experience is deliberately somber and contemplative, encouraging critical thinking about how we assess global risk in high-stakes environments.

### Color Palette
- **Background**: Deep military blacks `oklch(12.9% 0.042 264.695)`
- **Primary Accent**: Phosphor terminal green `oklch(72.3% 0.219 149.579)`
- **Typography**: IBM Plex Sans, IBM Plex Serif, Fira Code

### Key Visual Elements
- Custom SVG clock with manual arc rendering
- Animated glows and pulses for critical states
- Monospace tabular numerals for stable layouts
- CRT scanline effects (subtle)

## 🧮 How It Works

### Signal Weighting
Each signal has:
- **Category**: Geopolitical, Cyber, Media, or Strategic
- **Weight**: Impact on total risk score (positive = escalation, negative = de-escalation)
- **Decay Rate**: How quickly the signal loses relevance (typically 3-8% per hour)

### Time Decay Model
Signal impact decreases exponentially over time using the formula:

```
Current Weight = Initial Weight × e^(-decay_rate × hours_elapsed)
```

Signals are automatically removed when their impact falls below 5% of original weight.

### Risk Calculation
```
Total Score = Σ (Current Weight of all active signals)
Minutes to Midnight = max(1, 12 - (Total Score / 10))
```

### Risk States
- **STABLE**: ≥10 minutes to midnight
- **ELEVATED**: 5-9.9 minutes to midnight
- **SEVERE**: 2-4.9 minutes to midnight
- **CRITICAL**: <2 minutes to midnight

## 🛠️ Technology Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui v4
- **Icons**: Phosphor Icons
- **Animations**: Framer Motion
- **State Management**: React hooks + Spark KV persistence
- **Notifications**: Sonner

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/               # shadcn component library
│   ├── AddSignalDialog.tsx
│   ├── DisclaimerBanner.tsx
│   ├── DoomsdayClock.tsx
│   ├── HistoricalContext.tsx
│   ├── SignalCard.tsx
│   ├── StatsSummary.tsx
│   └── WorldMap.tsx
├── hooks/
│   ├── use-audio.ts      # Web Audio API synthesized sounds
│   └── use-mobile.ts     # Responsive breakpoint detection
├── lib/
│   ├── risk-calculator.ts    # Core risk calculation logic
│   ├── signal-presets.ts     # 20+ curated signal templates
│   ├── types.ts              # TypeScript interfaces
│   └── utils.ts              # Utility functions
├── App.tsx               # Main application component
└── index.css             # Global styles and theme
```

## 🎓 Educational Use Cases

### Classroom & Workshops
- **International Relations**: Demonstrate how multiple factors combine in geopolitical risk assessment
- **Data Visualization**: Show effective use of animation, color, and metaphor in serious contexts
- **Systems Thinking**: Illustrate feedback loops, decay, and emergent behavior
- **Media Literacy**: Explore how information warfare and propaganda impact perception of risk

### Self-Directed Learning
- Experiment with different scenarios (e.g., "What if three major nations withdrew from treaties?")
- Compare fictional scenarios to historical reference points
- Understand the mathematical models behind risk aggregation
- Learn about signal intelligence and open-source intelligence gathering

## 🔒 Data & Privacy

- **No external APIs**: All data is stored locally in your browser
- **No tracking**: Zero analytics or telemetry
- **No user accounts**: Fully client-side application
- **Persistence**: Uses browser localStorage via Spark KV API

## 🤝 Contributing

This is an educational project. If you'd like to contribute:

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

### Quick Contribution Ideas
- Additional signal presets based on historical events
- Enhanced time decay models (e.g., different curves for different signal types)
- Alternative visualization modes (timeline view, network graph)
- Export functionality for sharing scenarios
- Localization/internationalization

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the [Bulletin of Atomic Scientists' Doomsday Clock](https://thebulletin.org/doomsday-clock/)
- Cold War command center aesthetics
- Open-source intelligence (OSINT) methodologies
- Signal intelligence community

## ⚖️ Disclaimer

**This is an educational and artistic project.** The Doomsday Signal:
- Does NOT predict real-world events
- Does NOT use classified or proprietary intelligence
- Does NOT provide actionable security assessments
- Does NOT represent the views of any government or organization
- SHOULD NOT be used for actual risk assessment or decision-making

All signals are fictional examples created for learning purposes. Any resemblance to real events is for educational context only.

---

**Built with React, TypeScript, and a commitment to transparent, educational technology.**

## 📚 Documentation

- **[Quick Start Guide](./docs/QUICKSTART.md)** - Get running in 5 minutes
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Deploy to production
- **[Contributing Guide](./CONTRIBUTING.md)** - Add features or fix bugs
- **[Product Requirements](./PRD.md)** - Design rationale and specifications
- **[Changelog](./CHANGELOG.md)** - Version history and roadmap
- **[All Documentation](./docs/README.md)** - Complete docs index

---

*Questions or feedback? Open an issue or start a discussion.*
