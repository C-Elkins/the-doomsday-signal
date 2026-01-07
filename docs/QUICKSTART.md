# Quick Start Guide

Get The Doomsday Signal running in under 5 minutes.

## Prerequisites

- **Node.js** 18 or higher ([download here](https://nodejs.org/))
- **npm** (comes with Node.js)
- Modern web browser (Chrome, Firefox, Safari, or Edge)

## Installation

### 1. Clone or Download

**Option A: Clone with Git**
```bash
git clone <repository-url>
cd spark-template
```

**Option B: Download ZIP**
1. Download the project as a ZIP file
2. Extract to your desired location
3. Open terminal in the extracted folder

### 2. Install Dependencies

```bash
npm install
```

This will take 1-2 minutes to download and install all required packages.

### 3. Start Development Server

```bash
npm run dev
```

You should see output like:
```
VITE v7.2.6  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 4. Open in Browser

Navigate to **http://localhost:5173** in your browser.

The application should load with:
- The Doomsday Clock showing 12.0 minutes (STABLE state)
- Empty signal feed
- Stats showing 0 active signals

## First Steps

### Add Your First Signal

1. Click the **"Add Signal"** button in the top right
2. Choose the **"Quick Presets"** tab (default)
3. Select a category (Geopolitical, Cyber, Media, Strategic)
4. Click any preset to add it
5. Watch the clock update!

**Try these presets first:**
- **Geopolitical** → "Military Exercise Near Border" (+10 weight)
- **Cyber** → "Critical Infrastructure Cyber Attack" (+14 weight)
- **Media** → "Nuclear Rhetoric Escalation" (+16 weight)

### Explore Features

**Add multiple signals** to see how they combine:
- Mix escalation (+) and de-escalation (-) signals
- Observe how the clock moves
- Watch risk state change (STABLE → ELEVATED → SEVERE → CRITICAL)

**Watch time decay:**
- Signals lose impact over time (check the progress bars)
- Old signals automatically disappear when impact < 5%
- Refresh the page - signals persist!

**Compare to history:**
- Check the Historical Context panel (right side on desktop)
- See how your scenario compares to real historical events

### Create Custom Signals

1. Click **"Add Signal"**
2. Switch to **"Custom Signal"** tab
3. Fill in:
   - **Category**: Choose signal type
   - **Description**: Describe the event
   - **Weight**: Set impact (+/- numbers)
4. Submit!

**Example custom signal:**
```
Category: Geopolitical
Description: Major power summit announces joint climate initiative
Weight: -8  (negative = de-escalation)
```

## Troubleshooting

### Port 5173 Already in Use

If you see `Port 5173 is in use`, either:

**Option A: Use a different port**
```bash
npm run dev -- --port 3000
```

**Option B: Kill the existing process**
```bash
# On Mac/Linux
lsof -ti:5173 | xargs kill -9

# On Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Build Errors

If `npm install` fails:

1. **Check Node.js version:**
   ```bash
   node --version  # Should be v18 or higher
   ```

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Try legacy peer deps:**
   ```bash
   npm install --legacy-peer-deps
   ```

### Application Won't Load

1. **Check browser console** (F12 → Console tab)
2. **Clear browser cache** (Cmd+Shift+Delete / Ctrl+Shift+Delete)
3. **Try incognito/private mode**
4. **Try a different browser**

### TypeScript Errors

If you see TypeScript errors during development:

```bash
npm run build  # This will show all errors
```

Most type errors won't prevent the app from running in dev mode.

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |

## Project Structure (Simplified)

```
spark-template/
├── src/
│   ├── App.tsx              ← Main app component
│   ├── components/          ← UI components
│   │   ├── DoomsdayClock.tsx
│   │   ├── SignalCard.tsx
│   │   └── AddSignalDialog.tsx
│   ├── lib/
│   │   ├── risk-calculator.ts   ← Risk math
│   │   └── signal-presets.ts    ← Preset library
│   └── index.css            ← Styles & theme
├── index.html               ← Entry HTML
├── package.json             ← Dependencies
└── README.md                ← Full documentation
```

## Making Changes

### Edit Colors

Open `src/index.css` and modify the `:root` section:

```css
:root {
  --background: oklch(12.9% 0.042 264.695);  /* Deep black-blue */
  --primary: oklch(72.3% 0.219 149.579);     /* Phosphor green */
  /* ... */
}
```

### Add Signal Presets

Open `src/lib/signal-presets.ts`:

```typescript
{
  id: 'my-new-preset',
  category: 'geopolitical',
  name: 'My Event Name',
  description: 'What happened',
  weight: 12,
  decayRate: 0.05,
}
```

### Modify Risk Calculation

Open `src/lib/risk-calculator.ts` and edit the `scoreToMinutes` function:

```typescript
export function scoreToMinutes(score: number): number {
  const minutes = Math.max(1, 12 - (score / 10))
  return Math.round(minutes * 10) / 10
}
```

## Next Steps

✅ **Read the full README** for comprehensive documentation  
✅ **Explore the PRD** (`PRD.md`) for design rationale  
✅ **Check CONTRIBUTING** (`CONTRIBUTING.md`) to add features  
✅ **Review signal presets** to understand impact weights  
✅ **Experiment with scenarios** to learn about risk modeling  

## Getting Help

- **Documentation**: See [README.md](../README.md)
- **Issues**: Check existing [GitHub Issues]
- **Discussions**: Ask questions in [GitHub Discussions]
- **Code**: Read inline comments in source files

## Educational Use

**For Educators:**
- Use presets to simulate historical scenarios
- Ask students to create custom signals
- Compare different conflict escalation paths
- Discuss time decay and information relevance

**For Students:**
- Experiment with signal combinations
- Research real events and create matching signals
- Analyze how risk compounds and decays
- Understand transparent risk methodology

---

**Ready to dive deeper? Read the [full README](../README.md) →**

**Want to contribute? See [CONTRIBUTING.md](../CONTRIBUTING.md) →**

**Questions? Open an issue or discussion on GitHub.**
