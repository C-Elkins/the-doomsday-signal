# Contributing to The Doomsday Signal

Thank you for your interest in contributing to The Doomsday Signal! This educational project welcomes contributions from developers, educators, designers, and anyone interested in data visualization and risk assessment methodologies.

## 🎯 Project Goals

Before contributing, please understand the project's core goals:

1. **Educational First**: All features should teach concepts related to risk assessment, signal intelligence, or systems thinking
2. **Transparency**: Calculations and methodologies must be traceable and understandable
3. **Artistic Expression**: Design choices should reinforce the Cold War command center aesthetic
4. **No Predictions**: This is not a forecasting tool and should never claim to predict real events
5. **Accessibility**: Features should be usable by diverse audiences including educators and students

## 🚀 How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:

- **Clear title**: Describe the issue concisely
- **Steps to reproduce**: Detailed steps to recreate the bug
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Environment**: Browser, OS, screen size
- **Console errors**: Check browser DevTools console

**Example**:
```
Title: Clock animation stutters when adding multiple signals rapidly

Steps:
1. Click "Add Signal" 
2. Select a preset
3. Immediately repeat 5 times quickly
4. Observe clock animation

Expected: Smooth animation between states
Actual: Clock jumps and stutters
Browser: Chrome 120, macOS 14
Console: No errors shown
```

### Suggesting Features

We welcome feature suggestions! Please open an issue with:

- **Use Case**: Why is this feature valuable for education?
- **Description**: What should it do?
- **Mockups**: Visual examples if relevant
- **Complexity**: Your estimate of implementation difficulty

**Good Feature Ideas**:
- Additional historical events for context
- New signal presets based on research
- Alternative decay models (different mathematical curves)
- Export/import functionality for classroom scenarios
- Timeline view showing signal history

**Out of Scope**:
- Real-time data feeds (conflicts with educational focus)
- User accounts/social features
- Prediction algorithms
- Connection to external risk databases

### Code Contributions

#### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/spark-template.git
   cd spark-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### Development Guidelines

##### Code Style

- **TypeScript**: Use strict typing, avoid `any`
- **Components**: Functional components with hooks
- **Naming**: 
  - Components: PascalCase (`SignalCard.tsx`)
  - Functions: camelCase (`calculateRiskScore`)
  - Constants: UPPER_SNAKE_CASE (`MAX_SIGNALS`)
- **Comments**: Only for complex logic, not obvious code
- **Formatting**: Project uses Prettier (run before committing)

##### Component Structure

```typescript
import { useState } from 'react'
import { ComponentProps } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface MyComponentProps {
  signal: Signal
  onUpdate: (id: string) => void
}

export function MyComponent({ signal, onUpdate }: MyComponentProps) {
  const [state, setState] = useState<boolean>(false)
  
  const handleClick = () => {
    onUpdate(signal.id)
  }
  
  return (
    <div className="p-4">
      <Button onClick={handleClick}>
        {signal.description}
      </Button>
    </div>
  )
}
```

##### Styling Guidelines

- Use **Tailwind utility classes** preferentially
- Use **CSS variables** for theme colors (`--primary`, `--background`, etc.)
- Follow **existing design patterns** (monospace for data, green glow effects, etc.)
- Ensure **WCAG AA contrast** compliance (4.5:1 for text, 3:1 for large text)
- Test on **mobile devices** (responsive design required)

##### State Management

- Use `useKV` hook for persistent data (signals, preferences)
- Use `useState` for ephemeral UI state (dialogs, hover states)
- Never use `localStorage` directly (use Spark KV API)

**Example**:
```typescript
import { useKV } from '@github/spark/hooks'

const [signals, setSignals] = useKV<Signal[]>('signals', [])

// ALWAYS use functional updates with useKV
setSignals((currentSignals) => [...currentSignals, newSignal])
```

##### Testing

Currently, the project does not have automated tests, but:

- **Manual testing required** for all changes
- Test in Chrome, Firefox, and Safari
- Test on mobile viewport (375px, 768px, 1920px widths)
- Verify animations perform well (60fps)
- Check console for errors

Future: We welcome contributions to add testing infrastructure (Vitest, Testing Library).

#### Pull Request Process

1. **Update your branch**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Ensure code quality**
   ```bash
   npm run build  # Should complete without errors
   ```

3. **Commit with clear messages**
   ```bash
   git commit -m "Add decay curve customization feature
   
   - Added DecayCurve type with linear/exponential/logarithmic options
   - Updated risk calculator to support multiple curves
   - Added UI controls in AddSignalDialog
   - Updated documentation
   
   Closes #42"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open Pull Request**
   - Provide clear description of changes
   - Reference related issues
   - Add screenshots for UI changes
   - Explain testing performed

#### PR Review Checklist

Reviewers will check:

- [ ] Code follows project conventions
- [ ] No TypeScript errors or warnings
- [ ] Responsive design works on mobile
- [ ] Accessibility not degraded
- [ ] Performance is acceptable
- [ ] Educational value is clear
- [ ] Documentation updated if needed
- [ ] No console errors in browser

### Documentation Contributions

Documentation improvements are highly valued! You can:

- Fix typos or unclear explanations
- Add examples or tutorials
- Translate documentation (internationalization)
- Create video tutorials or blog posts
- Improve code comments

**Key docs to improve**:
- `README.md` - Main project documentation
- `PRD.md` - Product requirements and design rationale
- `CHANGELOG.md` - Track version history
- `docs/SCREENSHOTS.md` - Screenshot guide
- Code comments in complex algorithms

### Design Contributions

If you're a designer:

- **Alternative themes**: Propose color palette variations
- **Icon designs**: Custom icons for signal categories
- **Animations**: Suggest motion design improvements
- **Layout alternatives**: Mobile-first redesigns
- **Accessibility**: Color contrast improvements

Please provide **Figma files, screenshots, or CodePen demos**.

## 🎓 Educational Content Ideas

We especially welcome contributions that enhance educational value:

### Signal Presets
Add new signal presets based on historical research. Each preset needs:

```typescript
{
  id: 'unique-kebab-case-id',
  category: 'geopolitical', // or cyber, media, strategic
  name: 'Brief Descriptive Name',
  description: 'Clear one-sentence description of the event',
  weight: 10, // Impact score (use historical context to estimate)
  decayRate: 0.05, // How fast relevance decreases (3-8% per hour typical)
}
```

**Research-based examples welcome**:
- Historical arms races
- Major diplomatic breakthroughs
- Cyber warfare campaigns
- Media manipulation incidents

### Historical Context Events
Add reference points for the Historical Context panel:

```typescript
{
  name: 'Berlin Crisis',
  minutesToMidnight: 4.0,
  description: '1961 - Construction of Berlin Wall and heightened tensions',
}
```

### Alternative Decay Models
Propose different mathematical models for time decay:

- **Linear decay**: `weight * (1 - (rate * hours))`
- **Exponential decay**: `weight * e^(-rate * hours)` (current)
- **Logarithmic decay**: `weight * log(1 + hours) / log(max_hours)`
- **Step-function decay**: Sudden drops at milestones

Explain the educational reasoning for each model.

## 📋 Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn components (don't modify)
│   ├── AddSignalDialog.tsx    # Signal creation UI
│   ├── DoomsdayClock.tsx      # Main clock visualization
│   ├── SignalCard.tsx         # Individual signal display
│   └── ...
├── hooks/
│   ├── use-audio.ts           # Web Audio API sounds
│   └── use-mobile.ts          # Responsive breakpoints
├── lib/
│   ├── risk-calculator.ts     # Core risk math
│   ├── signal-presets.ts      # Curated signal templates
│   ├── types.ts               # TypeScript interfaces
│   └── utils.ts               # Helper functions
└── App.tsx                    # Main application
```

## 🤝 Code of Conduct

### Our Standards

- **Be respectful**: This is an educational project about serious topics
- **Be constructive**: Focus on improving the project
- **Be inclusive**: Welcome contributors of all skill levels
- **Be educational**: Prioritize learning and transparency
- **Be patient**: Reviews and responses may take time

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Political arguments unrelated to project improvement
- Spam or promotional content
- Violating contributor privacy

### Enforcement

Violations will result in:
1. Warning from maintainers
2. Temporary ban from project
3. Permanent ban for severe or repeated violations

Report violations to [maintainer email/contact].

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions?

- Open a GitHub Discussion for general questions
- Open an Issue for bug reports or feature requests
- Tag contributions with appropriate labels:
  - `bug` - Something isn't working
  - `enhancement` - New feature or improvement
  - `documentation` - Documentation improvements
  - `good first issue` - Good for newcomers
  - `help wanted` - Extra attention needed

## 🙏 Recognition

All contributors will be recognized in:
- GitHub Contributors page
- CHANGELOG.md for significant contributions
- README acknowledgments (optional)

Thank you for helping make The Doomsday Signal a better educational resource! 🚀

---

**First time contributing to open source? Check out [First Timers Only](https://www.firsttimersonly.com/) for helpful resources.**
