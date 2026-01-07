# Release Checklist

Use this checklist before publishing The Doomsday Signal.

## 📋 Pre-Release Checklist

### Code Quality
- [ ] No console errors in browser DevTools
- [ ] No TypeScript errors: `npm run build` completes successfully
- [ ] No ESLint warnings: `npm run lint` passes
- [ ] All features work as expected in dev mode
- [ ] Production build works: `npm run preview` runs without issues

### Functionality Testing
- [ ] Clock displays correctly and updates smoothly
- [ ] All 20+ signal presets load and work correctly
- [ ] Custom signal creation works
- [ ] Signal deletion works
- [ ] Time decay progresses correctly
- [ ] Signals auto-remove when impact < 5%
- [ ] Data persists after page refresh (localStorage/KV)
- [ ] Stats dashboard shows correct numbers
- [ ] Historical context panel displays properly
- [ ] Disclaimer banner shows on load

### Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Responsive Design
- [ ] Desktop (1920x1080): All elements visible, proper layout
- [ ] Laptop (1366x768): No horizontal scroll, readable text
- [ ] Tablet (768x1024): Stacked layout, touch-friendly buttons
- [ ] Mobile (375x667): Single column, full-width components
- [ ] Clock scales appropriately on all screen sizes

### Performance
- [ ] Page loads in < 3 seconds on fast connection
- [ ] Animations run at 60fps
- [ ] No layout shift during load (check Lighthouse CLS)
- [ ] Images (if any) are optimized
- [ ] Build size is reasonable (check `dist/` folder size)

### Accessibility
- [ ] All interactive elements keyboard accessible (Tab navigation)
- [ ] Focus states visible on all buttons/inputs
- [ ] ARIA labels present on icon buttons
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] No flashing content that could trigger seizures

## 📄 Documentation

### Core Files
- [ ] README.md is complete and accurate
- [ ] CHANGELOG.md reflects current version
- [ ] CONTRIBUTING.md has clear guidelines
- [ ] LICENSE file is present (MIT)
- [ ] SECURITY.md has contact info
- [ ] PRD.md matches current implementation

### Additional Docs
- [ ] docs/QUICKSTART.md has correct setup steps
- [ ] docs/DEPLOYMENT.md has deployment instructions
- [ ] docs/SCREENSHOTS.md explains how to capture images
- [ ] docs/README.md indexes all documentation

### Screenshots
- [ ] Screenshots are captured (or note added to capture them)
- [ ] Images are optimized (<500KB each)
- [ ] Screenshot folder structure exists: `docs/screenshots/`
- [ ] README references screenshots correctly

### Code Documentation
- [ ] Complex algorithms have comments explaining logic
- [ ] All major components have brief description comments
- [ ] TypeScript types are documented where needed
- [ ] Exported functions have JSDoc comments (optional but nice)

## 🔧 Configuration

### package.json
- [ ] Version number updated (e.g., `1.0.0`)
- [ ] Project name is correct (`the-doomsday-signal`)
- [ ] Description is accurate
- [ ] Keywords are relevant
- [ ] License field matches LICENSE file
- [ ] Repository URL is correct (if public)
- [ ] Author field is set

### index.html
- [ ] `<title>` is descriptive: "The Doomsday Signal"
- [ ] Meta description is present
- [ ] Favicon exists (create if missing)
- [ ] Google Fonts are loaded correctly
- [ ] No hardcoded development URLs

### Environment
- [ ] No `.env` files with secrets committed
- [ ] `.gitignore` excludes `node_modules/`, `dist/`, `.env`
- [ ] No sensitive data in source code
- [ ] No API keys or tokens hardcoded

## 🚀 Deployment Preparation

### Build Verification
- [ ] Clean install works: `rm -rf node_modules && npm install`
- [ ] Build succeeds: `npm run build`
- [ ] Preview works: `npm run preview`
- [ ] Build output is in `dist/` folder
- [ ] `dist/` contains `index.html`, JS bundles, CSS, assets

### Hosting (if deploying immediately)
- [ ] Chosen hosting platform (GitHub Pages, Vercel, Netlify, etc.)
- [ ] Domain configured (if using custom domain)
- [ ] SSL/HTTPS enabled
- [ ] Build settings configured correctly
- [ ] Environment variables set (if any)

### Git Repository
- [ ] All changes committed
- [ ] Commit messages are clear and descriptive
- [ ] No uncommitted changes: `git status` is clean
- [ ] Branch is up to date with main/master
- [ ] Tags created for version: `git tag v1.0.0`

## 📢 Release Communication

### GitHub Release
- [ ] Create GitHub release for version tag
- [ ] Release notes summarize changes
- [ ] Link to demo site (if deployed)
- [ ] Mention educational purpose in release notes

### README Badges (Optional)
- [ ] Build status badge
- [ ] License badge
- [ ] Version badge
- [ ] Deploy status badge

Example badges:
```markdown
![Build Status](https://img.shields.io/github/actions/workflow/status/USER/REPO/deploy.yml)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
```

## 🎓 Educational Materials (Optional)

- [ ] Sample lesson plan for educators
- [ ] Example scenarios document
- [ ] Video tutorial or walkthrough
- [ ] Blog post about the project
- [ ] Social media announcement draft

## 🔒 Security

### Code Review
- [ ] No `eval()` or unsafe dynamic code execution
- [ ] No inline scripts in HTML (CSP-safe)
- [ ] Dependencies are up to date: `npm audit`
- [ ] No critical vulnerabilities: `npm audit` shows 0 high/critical
- [ ] Sensitive operations validated (though this app has none)

### Privacy
- [ ] No tracking scripts (unless disclosed)
- [ ] No external API calls that leak data
- [ ] localStorage usage is documented
- [ ] No PII (Personally Identifiable Information) collected

## 📊 Analytics (Optional)

If adding analytics:
- [ ] Privacy-friendly analytics chosen (e.g., Plausible)
- [ ] Cookie consent banner (if required by law)
- [ ] Privacy policy page (if collecting data)
- [ ] Analytics documented in README

## ✅ Final Verification

### Pre-Launch Test
1. [ ] Clear browser cache
2. [ ] Visit deployed URL (or localhost:5173)
3. [ ] Add 5 different signals
4. [ ] Refresh page - signals should persist
5. [ ] Delete a signal
6. [ ] Reset all signals
7. [ ] Try on mobile device
8. [ ] Share with a friend for feedback

### Launch Day
- [ ] Announce on relevant platforms (GitHub, Reddit, Twitter, etc.)
- [ ] Share with educational communities
- [ ] Post in data visualization communities
- [ ] Ask for feedback and contributions

### Post-Launch Monitoring
- [ ] Check for issues reported
- [ ] Monitor error logs (if tracking is enabled)
- [ ] Respond to user questions
- [ ] Gather feedback for future improvements

## 🎉 Launch!

Once all items are checked:

```bash
# Tag the release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Deploy (varies by platform)
# See docs/DEPLOYMENT.md

# Create GitHub Release
# Go to GitHub → Releases → Draft a new release
```

---

## 📝 Post-Release Tasks

### Week 1
- [ ] Monitor for critical bugs
- [ ] Respond to initial user feedback
- [ ] Update documentation based on questions
- [ ] Fix any deployment issues

### Month 1
- [ ] Review analytics (if enabled)
- [ ] Prioritize feature requests
- [ ] Update CHANGELOG with any patches
- [ ] Plan next version roadmap

### Ongoing
- [ ] Keep dependencies updated
- [ ] Address security vulnerabilities promptly
- [ ] Respond to contributions
- [ ] Maintain documentation accuracy

---

## 🐛 If Something Goes Wrong

**Critical bug discovered after launch?**

1. **Hotfix immediately:**
   ```bash
   git checkout main
   git checkout -b hotfix/critical-bug
   # Fix the bug
   git commit -m "Hotfix: Fix critical XYZ issue"
   git push origin hotfix/critical-bug
   # Merge and deploy
   ```

2. **Rollback deployment:**
   - Most platforms allow instant rollback to previous version
   - See docs/DEPLOYMENT.md for platform-specific steps

3. **Communicate:**
   - Post issue on GitHub
   - Update users if they're affected
   - Document the issue in CHANGELOG

---

**Ready to launch? Let's go! 🚀**

After launch, celebrate your work and start planning improvements based on user feedback!
