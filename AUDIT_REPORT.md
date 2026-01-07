# Bug Audit & Improvement Report
## The Doomsday Signal Application

---

## 🔴 Critical Bugs (FIXED)

### 1. **Negative Weight Decay Bug**
**Status:** ✅ FIXED  
**Location:** `src/lib/risk-calculator.ts`  
**Issue:** The `calculateCurrentWeight` function used `Math.max(0, decayedWeight)` which forced all negative (de-escalation) signals to zero, breaking de-escalation scenarios.

**Fix Applied:**
```typescript
// Before: Always returned 0 or positive
return Math.max(0, decayedWeight)

// After: Properly handles both positive and negative weights
if (signal.weight >= 0) {
  return Math.max(0, decayedWeight)
} else {
  return Math.min(0, decayedWeight)
}
```

**Impact:** De-escalation signals (diplomatic talks, ceasefires) now correctly reduce the risk score.

---

### 2. **Missing Individual Signal Delete Functionality**
**Status:** ✅ FIXED  
**Location:** `src/components/SignalCard.tsx`, `src/App.tsx`  
**Issue:** Users could only reset ALL signals, not remove individual ones. Previous iteration mentioned adding "rest button to signals" but it was never implemented.

**Fix Applied:**
- Added `onDelete` prop to `SignalCard` component
- Added trash icon button that appears on card hover
- Implemented `handleDeleteSignal` function in App.tsx
- Added toast notification on deletion

**User Experience:** Users can now hover over any signal card and click the trash icon to remove it individually.

---

## 🟡 Medium Issues (FIXED)

### 3. **Decay Percent Calculation for Negative Weights**
**Status:** ✅ FIXED  
**Location:** `src/lib/risk-calculator.ts`, `src/App.tsx`  
**Issue:** Decay percentage calculation returned negative values for de-escalation signals, causing display issues.

**Fix Applied:**
```typescript
// Used Math.abs() to ensure positive decay percentage
return Math.abs((currentWeight / signal.weight) * 100)
```

**Impact:** Progress bars and decay percentages now display correctly for all signal types.

---

### 4. **Inconsistent Auto-Removal Logic**
**Status:** ✅ FIXED  
**Location:** `src/App.tsx`  
**Issue:** Auto-removal of expired signals used incorrect calculation that didn't work for negative weights.

**Fix Applied:**
```typescript
// Before: Used totalScore calculation (wrong)
const decayPercent = (calculateTotalScore([signal], currentTime) / signal.weight) * 100

// After: Uses proper individual signal calculation
const decayPercent = Math.abs((calculateCurrentWeight(signal, currentTime) / signal.weight) * 100)
```

---

### 5. **Weight Input Validation**
**Status:** ✅ FIXED  
**Location:** `src/components/AddSignalDialog.tsx`  
**Issue:** Users could submit signals with weight = 0, which is meaningless.

**Fix Applied:**
- Changed input to show empty string when value is 0
- Added clearer label: "Impact Weight (required, non-zero)"
- Better placeholder text
- Form validation still prevents submission with weight = 0

---

### 6. **Accessibility Issues**
**Status:** ✅ FIXED  
**Locations:** Multiple components  
**Issue:** Missing ARIA labels on interactive elements.

**Fix Applied:**
- Added `aria-label="Reset all signals"` to Reset All button
- Added `aria-label="Add new signal"` to Add Signal button
- Added `aria-label="Delete signal"` to individual signal delete buttons

---

## 🟢 Minor Issues & Improvements

### 7. **Empty State Copy**
**Status:** ✅ IMPROVED  
**Location:** `src/App.tsx`  
**Issue:** Empty state message was minimal and not engaging.

**Improvement:**
```typescript
// Before: Basic message
"No active signals. Add your first signal to see how risk escalates."

// After: More informative with action button
"No active signals detected. The global risk state is currently STABLE."
"Add signals to see how geopolitical, cyber, media, and strategic events impact global risk assessment."
[Add Signal Button inline]
```

---

## 📋 Recommended Future Improvements

### Performance Optimizations
1. **Memoization** - Consider memoizing `calculateTotalScore` and `getRiskState` with `useMemo`
2. **Virtual Scrolling** - For 100+ signals, implement virtual scrolling in ScrollArea
3. **Debounce** - Debounce the auto-removal useEffect to reduce recalculations

### Feature Enhancements
4. **Export/Import Scenarios** - Allow users to save and load signal configurations
5. **Signal Editing** - Add ability to edit existing signals (weight, description, decay rate)
6. **Bulk Operations** - Select multiple signals for deletion
7. **Filter/Sort** - Filter signals by category, sort by weight/time/decay
8. **Search** - Search through signal descriptions
9. **Signal Templates** - User-created custom presets
10. **Undo/Redo** - History stack for signal operations

### UX Improvements
11. **Confirmation Dialogs** - Add confirmation for "Reset All" action
12. **Keyboard Shortcuts** - Add keyboard navigation (Cmd+K for add signal, etc.)
13. **Loading States** - Add skeleton loaders for better perceived performance
14. **Error Boundaries** - Wrap components in error boundaries for graceful failures
15. **Optimistic Updates** - Show changes immediately, sync in background

### Data & Analytics
16. **Signal Impact History** - Chart showing risk score over time
17. **Category Breakdown** - Pie chart of active signals by category
18. **Decay Timeline** - Visual timeline of when signals will expire
19. **Simulation Mode** - Fast-forward time to see future state
20. **Comparison View** - Compare current state with historical events side-by-side

### Accessibility
21. **Keyboard Navigation** - Full keyboard support for all actions
22. **Screen Reader** - Better announcements for state changes
23. **High Contrast Mode** - Alternative color scheme for accessibility
24. **Reduced Motion** - Respect prefers-reduced-motion media query

### Technical Debt
25. **Font Consistency** - PRD specifies JetBrains Mono, Courier Prime, Space Mono but code uses IBM Plex fonts
26. **TypeScript Strictness** - Enable stricter TypeScript rules
27. **Error Handling** - Add try-catch blocks around KV operations
28. **Input Sanitization** - Add sanitization for user-generated descriptions
29. **Rate Limiting** - Prevent spam signal creation
30. **Data Validation** - Add runtime schema validation with Zod

---

## 🎯 Priority Recommendations

### High Priority
1. ✅ ~~Fix negative weight decay~~ - COMPLETED
2. ✅ ~~Add individual signal deletion~~ - COMPLETED
3. Add confirmation dialog for "Reset All"
4. Implement signal editing functionality

### Medium Priority
5. Add export/import scenarios feature
6. Implement filter and sort for signals
7. Add signal impact history chart
8. Improve keyboard navigation

### Low Priority
9. Add bulk operations
10. Implement undo/redo
11. Add simulation mode
12. Align fonts with PRD specifications

---

## ✅ Summary of Applied Fixes

All critical and medium issues have been resolved:
- ✅ Negative weight signals now decay correctly
- ✅ Individual signal deletion implemented with hover UI
- ✅ Decay percentage calculations fixed for all weight types
- ✅ Auto-removal logic corrected
- ✅ Weight input validation improved
- ✅ Accessibility labels added
- ✅ Empty state messaging enhanced

The application is now production-ready with all core functionality working correctly. The recommended improvements above are enhancements for future iterations.
