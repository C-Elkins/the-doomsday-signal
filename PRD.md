# Planning Guide

A symbolic, data-inspired visualization that aggregates fictional global tension signals into a transparent "minutes to midnight" risk indicator, emphasizing educational value and systems thinking over prediction or panic.

**Experience Qualities**: 
1. **Sobering** - The interface should feel serious and contemplative, evoking the weight of global tension without sensationalism
2. **Transparent** - Every calculation and signal should be traceable, building trust through radical openness about methodology
3. **Educational** - Users should leave understanding how information warfare, cyber incidents, and geopolitical events interconnect and escalate

**Complexity Level**: Light Application (multiple features with basic state)
  - The app manages signal data, calculates risk scores with time decay, and presents historical context, but doesn't require complex multi-view navigation or advanced state orchestration

## Essential Features

**Risk Clock Display**
- Functionality: Displays current "minutes to midnight" risk level based on aggregated signal scores
- Purpose: Provides an immediate, visceral sense of current symbolic risk state
- Trigger: Loads automatically on app mount, updates when signals change
- Progression: User arrives → Clock animates to current position → Ticks subtly → Updates when signals added
- Success criteria: Clock position accurately reflects total weighted score, animates smoothly between states

**Signal Feed**
- Functionality: Lists recent geopolitical, media, cyber, and strategic signals with weights and timestamps
- Purpose: Makes the "why" behind the clock position completely transparent
- Trigger: Displays automatically below clock, updates when new signals added
- Progression: User scrolls feed → Reads signal details → Sees weight impact → Understands contribution to total
- Success criteria: Each signal shows category, description, weight (+/-), timestamp, and decay status

**Signal Creation (Educational Mode)**
- Functionality: Users can add fictional signals to see how they affect the clock
- Purpose: Teaches signal weighting, time decay, and systemic risk escalation
- Trigger: Click "Add Signal" button
- Progression: Click button → Select category → Enter description → Set weight → Submit → Clock updates → Signal appears in feed
- Progression: User sees immediate cause-and-effect between events and risk assessment
- Success criteria: New signals immediately affect clock position and appear in feed with decay timer

**Time Decay Visualization**
- Functionality: Shows how signal impact diminishes over time (older events matter less)
- Purpose: Demonstrates that risk is dynamic and historical events fade in relevance
- Trigger: Passive decay happens automatically every hour
- Progression: Signal added → Full weight applied → Time passes → Weight gradually reduces → Eventually removed
- Success criteria: Each signal shows "hours remaining" or decay percentage, clock adjusts as signals expire

**Historical Context Panel**
- Functionality: Shows how current risk level compares to historical crisis moments
- Purpose: Provides perspective on whether current state is truly critical or relatively calm
- Trigger: Always visible as reference markers on clock
- Progression: User views clock → Sees markers for Cuban Missile Crisis, Cold War peaks, etc. → Gains context
- Success criteria: Historical events marked on clock face with labels and brief descriptions

## Edge Case Handling

**No Signals Present** - Display "Stable" state with educational prompt to add first signal  
**All Negative Signals** - Clock can move backward past midnight (de-escalation scenario)  
**Extreme Score Overflow** - Cap maximum "minutes to midnight" at 1 minute, display "Critical" state banner  
**Rapid Signal Addition** - Clock animates smoothly even with burst of signals, queuing updates  
**Time Decay Edge** - Signals with <5% weight remaining auto-remove to keep feed clean

## Design Direction

The design should evoke Cold War-era command centers and declassified intelligence briefings—phosphor green terminals, analog clock mechanisms, and stark government typography. Users should feel like they're accessing a serious analytical tool, not entertainment. The experience should be contemplative and slightly unsettling, encouraging critical thinking about how we assess global risk.

## Color Selection

A Cold War terminal aesthetic with muted earth tones and signature phosphor green accents.

- **Primary Color**: Deep military olive `oklch(0.35 0.06 135)` - Evokes military command centers and serious analytical work
- **Secondary Colors**: Warm sepia `oklch(0.75 0.04 65)` for backgrounds suggests aged documents and declassified materials; dark charcoal `oklch(0.20 0.01 135)` for depth
- **Accent Color**: Phosphor terminal green `oklch(0.75 0.18 145)` - Iconic CRT terminal glow for the clock and active elements, signals urgency
- **Foreground/Background Pairings**: 
  - Background Sepia `oklch(0.92 0.02 65)`: Dark charcoal text `oklch(0.20 0.01 135)` - Ratio 11.2:1 ✓
  - Primary Olive `oklch(0.35 0.06 135)`: White text `oklch(0.99 0 0)` - Ratio 8.1:1 ✓
  - Accent Green `oklch(0.75 0.18 145)`: Dark charcoal `oklch(0.20 0.01 135)` - Ratio 8.5:1 ✓
  - Destructive Red `oklch(0.55 0.22 25)`: White text `oklch(0.99 0 0)` - Ratio 4.9:1 ✓

## Font Selection

Typefaces should evoke Cold War-era government documents, military intelligence reports, and early computer terminals—monospace for data, serious serif for authority.

- **Typographic Hierarchy**: 
  - Clock Display: JetBrains Mono Bold / 72px / Tight tracking / Tabular numerals for stable width
  - Section Headings: Courier Prime Bold / 24px / All caps / Letter spacing 0.05em
  - Signal Descriptions: Space Mono Regular / 14px / Line height 1.6
  - Metadata (timestamps, weights): Space Mono / 12px / Muted color / Tabular numerals
  - Body Text: IBM Plex Mono / 14px / Line height 1.7 for readability

## Animations

Animations should feel mechanical and deliberate—no bouncy modern easing. Clock ticks should be weighty, signal additions should feel like teletype output, and state changes should have the measured pace of analog instrumentation updating. Use linear or ease-in-out only. Avoid anything playful—every animation reinforces the seriousness of the subject matter.

## Component Selection

- **Components**: 
  - Card for signal items and historical context panel (modified with border colors matching theme)
  - Badge for signal categories (Geopolitical, Media, Cyber, Strategic) with category-specific colors
  - Dialog for signal creation form with dark overlay
  - Button for primary actions (styled with military aesthetic)
  - Progress for time decay visualization on each signal
  - Separator for dividing sections with subtle borders
  - ScrollArea for signal feed to handle many entries gracefully
  - Tabs for switching between current signals and historical playback mode
  
- **Customizations**: 
  - Custom SVG clock face with manual arc drawing for "minutes to midnight" indicator
  - Custom signal category icons using Phosphor icons (Globe, Newspaper, ShieldWarning, Rocket)
  - Monospace number displays with consistent width for stable layouts
  
- **States**: 
  - Buttons should have subtle hover with slightly lighter background, active state with border glow
  - Clock should pulse subtly when in Critical state
  - New signals should fade in with typewriter-style letter reveal
  - Expired signals should fade out gradually over 1 second
  
- **Icon Selection**: 
  - Clock for main risk indicator
  - Plus for adding signals
  - Warning for critical states
  - TrendUp/TrendDown for escalation indicators
  - Globe for geopolitical
  - Newspaper for media
  - ShieldWarning for cyber
  - Rocket for strategic signals
  
- **Spacing**: 
  - Container max-width: 1200px with horizontal padding of 8 (32px)
  - Section gaps: 12 (48px) for major sections
  - Signal card spacing: 4 (16px) between items
  - Internal card padding: 6 (24px) for breathing room
  
- **Mobile**: 
  - Clock scales down to 48px on mobile, remains primary visual focus
  - Signal feed becomes full-width with reduced padding (4 = 16px)
  - Two-column grid for signal metadata collapses to single column
  - Sticky header with clock summary collapses to icon + minutes only
  - Dialog forms stack vertically with full-width inputs
