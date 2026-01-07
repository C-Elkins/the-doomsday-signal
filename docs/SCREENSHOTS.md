# Screenshot Guide for The Doomsday Signal

This guide will help you capture high-quality screenshots for the README and documentation.

## Required Screenshots

### 1. Banner Image (`banner.png`)
**Dimensions**: 1200x630px (2:1 ratio)
**Content**: Full application view showing the Doomsday Clock at center with signals visible below

**Setup**:
1. Add 3-4 diverse signals from presets (mix of geopolitical, cyber, media, strategic)
2. Ensure clock shows a risk level around 5-7 minutes (ELEVATED state)
3. Zoom to 100% browser zoom
4. Capture the entire viewport from header to signal feed

**Notes**:
- Make sure the green glow effect on the clock is visible
- Include the disclaimer banner at the top
- Show stats summary section
- Capture in a dark environment to maximize glow effects

### 2. Doomsday Clock (`clock.png`)
**Dimensions**: 800x800px (1:1 ratio)
**Content**: Close-up of just the Doomsday Clock visualization

**Setup**:
1. Use browser zoom to 125% or crop tightly
2. Clock should be in ELEVATED or SEVERE state for visual interest
3. Center the clock in the frame
4. Capture when glow animation is at peak brightness

**Notes**:
- The phosphor green should be prominent
- Roman numerals should be clearly visible
- Show the "Minutes to Midnight" label below
- Include the risk state badge (ELEVATED/SEVERE/etc.)

### 3. Signal Feed (`signals.png`)
**Dimensions**: 1000x800px
**Content**: Active signals list with 4-6 signals visible

**Setup**:
1. Add signals with varying decay levels (some fresh, some aged)
2. Include mix of positive and negative weights
3. Show all four categories represented
4. Scroll to show the signal list clearly
5. Hover over one signal to show delete button

**Notes**:
- Make sure category icons are visible
- Show the decay progress bars at different levels
- Include at least one "NEW" signal badge
- Capture with delete button visible on hover

### 4. Quick Presets Dialog (`presets.png`)
**Dimensions**: 900x700px
**Content**: The "Add Signal" dialog open on the "Quick Presets" tab

**Setup**:
1. Click "Add Signal" button
2. Ensure "Quick Presets" tab is active
3. Select "Geopolitical" category to show presets
4. Scroll to show 5-6 preset options
5. Hover over one preset to show hover state

**Notes**:
- Show the category tabs (Geo, Cyber, Media, Strategic)
- Display preset cards with names, descriptions, and weights
- Capture the tab navigation structure
- Make sure dialog shadow and backdrop are visible

### 5. Statistics Dashboard (`stats.png`)
**Dimensions**: 1000x300px
**Content**: The stats summary section showing all four stat cards

**Setup**:
1. Add multiple signals to generate interesting stats
2. Ensure you have both escalation and de-escalation signals
3. Capture the full width of the stats grid
4. All four cards should be visible

**Notes**:
- Active Signals, Escalation, De-escalation, Last 24h
- Icons should be clearly visible
- Numbers should be realistic (not all zeros)
- Show color-coded icons

### 6. Historical Context (`context.png`) [OPTIONAL]
**Dimensions**: 400x600px
**Content**: The Historical Context sidebar panel

**Setup**:
1. Adjust clock to be near one of the historical events (e.g., ~3.5 minutes)
2. Capture just the Historical Context card
3. Show all historical reference points

**Notes**:
- Should show current level highlighted if matching
- All four historical events visible
- Clean crop with padding

## Screenshot Settings

### Browser Setup
- **Browser**: Chrome or Firefox (for consistent rendering)
- **Window Size**: 1920x1080 for full shots, adjust for specific components
- **Zoom**: 100% (unless noted otherwise)
- **Extensions**: Disable ad blockers and theme extensions
- **Dev Tools**: Closed (unless capturing with measurements)

### Display Settings
- **Monitor**: Use a high-DPI display if possible (Retina/4K)
- **Color Profile**: sRGB for web compatibility
- **Brightness**: 100% to capture glow effects properly
- **Dark Mode**: System dark mode ON (doesn't affect app but helps contrast)

### Capture Method

#### Option 1: Browser DevTools (Recommended)
```
1. Press F12 to open DevTools
2. Press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
3. Type "screenshot"
4. Select "Capture full size screenshot" or "Capture node screenshot"
```

#### Option 2: macOS Built-in
```
Cmd+Shift+4 → Spacebar → Click window (for full window with shadow)
Cmd+Shift+4 → Drag selection (for specific area)
```

#### Option 3: Windows Built-in
```
Win+Shift+S → Drag selection
Or use Snipping Tool
```

#### Option 4: Screenshot Extension
Use a browser extension like:
- Awesome Screenshot
- FireShot
- Nimbus Screenshot

### Image Processing

After capturing, optimize images:

```bash
# Using ImageOptim (Mac)
# Drag and drop images to compress

# Using pngquant (CLI)
pngquant --quality=80-95 --ext .png --force screenshot.png

# Using online tool
# TinyPNG.com or Squoosh.app
```

## File Naming Convention

```
docs/
└── screenshots/
    ├── banner.png          (1200x630, main hero image)
    ├── clock.png           (800x800, close-up of clock)
    ├── signals.png         (1000x800, signal feed list)
    ├── presets.png         (900x700, preset dialog)
    ├── stats.png           (1000x300, stats dashboard)
    └── context.png         (400x600, historical context - optional)
```

## Creating the Folder Structure

Run these commands from the project root:

```bash
mkdir -p docs/screenshots
```

Then add your captured and optimized screenshots to `docs/screenshots/`.

## Quality Checklist

Before finalizing screenshots:

- [ ] Images are properly cropped with minimal excess space
- [ ] Text is readable at 100% zoom
- [ ] Colors are accurate (phosphor green is vibrant)
- [ ] Glow effects are visible
- [ ] No personal information visible in browser chrome
- [ ] File sizes are optimized (<500KB per image)
- [ ] Images are named correctly per convention
- [ ] All images use PNG format (for sharp text)
- [ ] Aspect ratios match specifications above

## Tips for Best Results

1. **Timing**: Capture glow animations at peak brightness (they pulse)
2. **Signals**: Use realistic preset descriptions, not test data
3. **Variety**: Show different risk states across different screenshots
4. **Context**: Include enough surrounding UI to show context
5. **Cleanliness**: Remove any test/debug signals before capturing
6. **Consistency**: Use the same browser and zoom level for all shots

## Alternative: Programmatic Screenshots

If you have Node.js installed, you can use Playwright for automated screenshots:

```bash
npm install -D @playwright/test
```

Create `scripts/screenshots.js`:

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2000); // Wait for animations
  
  // Capture full page
  await page.screenshot({ path: 'docs/screenshots/banner.png', fullPage: true });
  
  // Capture clock specifically
  const clock = await page.locator('.clock-selector'); // Adjust selector
  await clock.screenshot({ path: 'docs/screenshots/clock.png' });
  
  await browser.close();
})();
```

Run with: `node scripts/screenshots.js`

---

**Once screenshots are captured and placed in `docs/screenshots/`, the README will automatically display them.**

**Need help? Open an issue with the "documentation" label.**
