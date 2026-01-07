# Visual Feature Guide

A text-based walkthrough of The Doomsday Signal's visual design and features.

## 🎨 Design Aesthetic

**Theme**: Cold War Command Center  
**Color Palette**: Deep blacks + Phosphor green terminal glow  
**Typography**: IBM Plex Sans, IBM Plex Serif, Fira Code monospace

### Color System
```
Background: Deep military black-blue  oklch(12.9% 0.042 264.695)
Primary:    Phosphor terminal green   oklch(72.3% 0.219 149.579)
Cards:      Slightly lighter black    oklch(20.8% 0.042 265.755)
Text:       Light greenish gray       oklch(79.2% 0.209 151.711)
```

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ Header                                                       │
│ ┌─────────────────────────────────────┬─────────────────┐  │
│ │ THE DOOMSDAY SIGNAL                 │ [Reset] [+Add]  │  │
│ │ A symbolic visualization...         │                  │  │
│ └─────────────────────────────────────┴─────────────────┘  │
│                                                              │
│ ⚠️  Educational Project Disclaimer Banner                   │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Doomsday Clock Visualization (SVG)                          │
│                                                              │
│              ╭─────────────────╮                            │
│             ╱   XII  11.8      ╲   ← Animated clock face   │
│            │    ╱     ╲         │     with Roman numerals   │
│            │   ╱   ●   ╲        │                           │
│            │  ╱    ▓    ╲       │  ← Glowing arc shows     │
│            │ IX    ▓     III    │     danger level         │
│             ╲      ▓      ╱                                 │
│              ╲     ▓     ╱                                  │
│               ╰─────────╯                                   │
│                                                              │
│                  7.5                                         │
│            MINUTES TO MIDNIGHT                              │
│                [ELEVATED]                                    │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Statistics Dashboard (4 cards)                              │
│ ┌──────────┬──────────┬──────────┬──────────┐             │
│ │ ⚡ 8      │ ↗ 5      │ ↘ 3      │ ⏰ 6     │             │
│ │ Active   │ Escalate │ De-esc   │ Last 24h │             │
│ └──────────┴──────────┴──────────┴──────────┘             │
│                                                              │
├─────────────────────────────────────┬───────────────────────┤
│ Active Signals (Scrollable)         │ Historical Context   │
│                                     │                       │
│ ╔═══════════════════════════════╗  │ ┌─────────────────┐  │
│ ║ 🌍 GEOPOLITICAL              ║  │ │ 2.0 min         │  │
│ ║ Military Exercise Near        ║  │ │ Cuban Missile   │  │
│ ║ Border                   +10  ║  │ │ Crisis (1962)   │  │
│ ║                               ║  │ ├─────────────────┤  │
│ ║ ⏱ 2h elapsed    78% remaining║  │ │ 3.5 min         │  │
│ ║ ████████████████▓▓▓           ║  │ │ Ukraine         │  │
│ ║ Dec 15, 10:23 AM         [🗑] ║  │ │ Invasion (2022) │  │
│ ╚═══════════════════════════════╝  │ ├─────────────────┤  │
│                                     │ │ 7.0 min         │  │
│ ╔═══════════════════════════════╗  │ │ Post-9/11       │  │
│ ║ 🛡️ CYBER                     ║  │ │ Tensions (2001) │  │
│ ║ Critical Infrastructure       ║  │ ├─────────────────┤  │
│ ║ Attack                   +14  ║  │ │ 11.0 min        │  │
│ ║                               ║  │ │ End of Cold War │  │
│ ║ ⏱ 5h elapsed    62% remaining║  │ │ (1991)          │  │
│ ║ ████████████▓▓▓▓▓▓▓▓          ║  │ └─────────────────┘  │
│ ║ Dec 15, 7:15 AM          [🗑] ║  │                       │
│ ╚═══════════════════════════════╝  │                       │
│                                     │                       │
│ ╔═══════════════════════════════╗  │                       │
│ ║ 📰 MEDIA                     ║  │                       │
│ ║ Nuclear Rhetoric              ║  │                       │
│ ║ Escalation               +16  ║  │                       │
│ ║                               ║  │                       │
│ ║ ⏱ 1h elapsed    92% remaining║  │                       │
│ ║ ██████████████████▓           ║  │                       │
│ ║ Dec 15, 11:00 AM    NEW  [🗑] ║  │                       │
│ ╚═══════════════════════════════╝  │                       │
│                                     │                       │
│ [More signals below...]             │                       │
│                                     │                       │
└─────────────────────────────────────┴───────────────────────┘
```

## 🎭 Interactive Elements

### Add Signal Dialog (Modal)

When user clicks "+ Add Signal" button:

```
╔═══════════════════════════════════════════════════════╗
║ Add New Signal                                   [×]  ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║ ┌──────────────────┬──────────────────┐             ║
║ │ ⚡ Quick Presets │ + Custom Signal  │ ← Tabs      ║
║ └──────────────────┴──────────────────┘             ║
║                                                       ║
║ ┌──────┬───────┬───────┬──────────┐                 ║
║ │ Geo  │ Cyber │ Media │ Strategic│ ← Category tabs ║
║ └──────┴───────┴───────┴──────────┘                 ║
║                                                       ║
║ ┌─────────────────────────────────────────────┐     ║
║ │ Major Treaty Withdrawal            [+15]    │     ║
║ │ Nation withdraws from major arms            │     ║
║ │ control treaty                              │     ║
║ │                            decay: 3%/hr     │     ║
║ ├─────────────────────────────────────────────┤     ║
║ │ Military Exercise Near Border      [+10]    │     ║
║ │ Large-scale military drills near            │     ║
║ │ contested border                            │     ║
║ │                            decay: 6%/hr     │     ║
║ ├─────────────────────────────────────────────┤     ║
║ │ Economic Sanctions Imposed          [+7]    │     ║
║ │ Major economic sanctions placed             │     ║
║ │                            decay: 4%/hr     │     ║
║ └─────────────────────────────────────────────┘     ║
║                                                       ║
║                 [More presets...]                    ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

### Custom Signal Tab

```
╔═══════════════════════════════════════════════════════╗
║ Add New Signal                                   [×]  ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║ ┌──────────────────┬──────────────────┐             ║
║ │ ⚡ Quick Presets │ + Custom Signal  │             ║
║ └──────────────────┴──────────────────┘             ║
║                                                       ║
║ Category                                              ║
║ ┌───────────────────────────────────┐                ║
║ │ Geopolitical               [▼]    │ ← Dropdown    ║
║ └───────────────────────────────────┘                ║
║                                                       ║
║ Description                                           ║
║ ┌───────────────────────────────────┐                ║
║ │ Enter signal description...       │ ← Text input  ║
║ └───────────────────────────────────┘                ║
║                                                       ║
║ Impact Weight (required, non-zero)                    ║
║ ┌─────────┐                                          ║
║ │ 10      │  +ve = escalation, -ve = de-escalation  ║
║ └─────────┘                                          ║
║                                                       ║
║               [Cancel]  [Add Signal]                 ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

## 🌈 Visual States

### Risk States & Colors

**STABLE** (≥10 minutes)
- Clock glow: Soft green `oklch(0.68 0.20 150)`
- Badge: Green border
- Mood: Calm, peaceful

**ELEVATED** (5-9.9 minutes)  
- Clock glow: Yellow-green `oklch(0.75 0.20 75)`
- Badge: Yellow border
- Mood: Cautious attention

**SEVERE** (2-4.9 minutes)
- Clock glow: Orange `oklch(0.72 0.22 50)`
- Badge: Orange border
- Mood: Serious concern

**CRITICAL** (<2 minutes)
- Clock glow: Red `oklch(0.62 0.26 28)`
- Badge: Red border, pulsing
- Mood: Urgent alarm

### Signal Card Hover State

```
Normal:
┌───────────────────────────────┐
│ 🌍 GEOPOLITICAL          +10  │
│ Military Exercise...           │
│ ⏱ 2h | 78%  ████████▓▓        │
└───────────────────────────────┘

Hover:
┌───────────────────────────────┐ ← Border glows
│ 🌍 GEOPOLITICAL          +10🗑│ ← Delete appears
│ Military Exercise...           │
│ ⏱ 2h | 78%  ████████▓▓        │
└───────────────────────────────┘
```

## 📱 Responsive Behavior

### Desktop (1920px)
- 3-column layout
- Clock at 550px diameter
- Side-by-side signal feed + context panel

### Tablet (768px)
- 2-column layout
- Clock at 450px diameter
- Stacked signal feed and context

### Mobile (375px)
- Single column
- Clock at 350px diameter
- All elements stack vertically
- Touch-optimized buttons (44px min)

## ✨ Animation Details

### Clock
- **Glow pulse**: 3-second cycle (fade 30% → 60% → 30%)
- **Hand rotation**: Smooth easing over 0.5s
- **Number appearance**: Staggered fade-in on load

### Signals
- **Add**: Fade in from top with slide (0.3s)
- **Delete**: Fade out to left (0.3s)
- **Progress bar**: Gradual width change
- **NEW badge**: Pulsing opacity

### Buttons
- **Hover**: Subtle background lighten (0.2s)
- **Click**: Brief scale down (0.1s)
- **Focus**: Ring outline appears

## 🎯 Key Visual Features

1. **Scanline Effect**: Subtle horizontal lines across background
2. **Radial Gradient**: Faint green glow from center
3. **Monospace Numbers**: Tabular numerals keep width consistent
4. **Icon Styling**: Duotone Phosphor icons with category colors
5. **Shadow Effects**: Subtle inset shadows on cards
6. **Typography**: Mix of sans (UI), serif (unused), mono (data)

## 🔍 Detail Highlights

### Clock Face
- 12 Roman numerals (XII at top for midnight)
- 60 tick marks (major every 5)
- Colored arc fills from XII clockwise
- Central pivot point with glow
- Historical event markers as small circles

### Signal Cards
- Category icon (left, 24px, colored)
- Category badge (top, monospace uppercase)
- Description text (wrapped, line-height 1.5)
- Weight display (right, large bold)
- Trend icon (↗ escalation, ↘ de-escalation)
- Time elapsed + decay % (small mono)
- Progress bar (thin, rounded)
- Timestamp (bottom, small gray)
- Delete button (hover only, top right)

### Stats Cards
- Large icon (colored, 24px)
- Big number (display font, 2xl)
- Label text (mono, xs, uppercase, gray)

---

**This visual guide helps understand the application without screenshots.**

**To capture actual screenshots, follow the instructions in `docs/SCREENSHOTS.md`**
