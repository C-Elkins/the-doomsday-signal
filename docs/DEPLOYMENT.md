# Deployment Guide

Deploy The Doomsday Signal to various hosting platforms.

## Build for Production

Before deploying, create an optimized production build:

```bash
npm run build
```

This generates a `dist/` folder with optimized, minified files ready for deployment.

**Test the build locally:**
```bash
npm run preview
```

## Deployment Options

### Option 1: GitHub Pages (Free)

Perfect for open-source educational projects.

**Steps:**

1. **Create `deploy.yml` workflow:**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - Save

3. **Push to main branch:**
```bash
git add .
git commit -m "Add deployment workflow"
git push origin main
```

4. **Access your site:**
   - `https://YOUR_USERNAME.github.io/REPO_NAME/`

**Custom Domain (Optional):**
- Add `CNAME` file to `public/` folder with your domain
- Configure DNS with your domain registrar

---

### Option 2: Vercel (Free)

Easiest deployment with automatic preview URLs for pull requests.

**Steps:**

1. **Install Vercel CLI (optional):**
```bash
npm install -g vercel
```

2. **Deploy:**

**Option A: CLI**
```bash
vercel
```

**Option B: GitHub Integration**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

3. **Configure:**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`

**Custom Domain:**
- Go to project settings → Domains
- Add your custom domain

**Live at:** `https://your-project.vercel.app`

---

### Option 3: Netlify (Free)

Similar to Vercel with additional features like form handling.

**Steps:**

1. **Deploy via Git:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - "Add new site" → "Import an existing project"
   - Select repository

2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

**Option: Manual Deploy**
```bash
npm run build
# Drag and drop 'dist' folder to netlify.com/drop
```

**Live at:** `https://your-site-name.netlify.app`

---

### Option 4: Cloudflare Pages (Free)

Fast global CDN with unlimited bandwidth.

**Steps:**

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. "Create a project" → "Connect to Git"
3. Select repository
4. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output: `dist`

**Live at:** `https://your-project.pages.dev`

---

### Option 5: Self-Hosted (VPS/Server)

For full control over hosting.

**Requirements:**
- Server with Node.js installed
- Web server (Nginx or Apache)

**Steps:**

1. **Build locally:**
```bash
npm run build
```

2. **Upload `dist/` folder to server:**
```bash
scp -r dist/* user@your-server.com:/var/www/doomsday-signal/
```

3. **Configure Nginx:**

Create `/etc/nginx/sites-available/doomsday-signal`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    root /var/www/doomsday-signal;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

4. **Enable site:**
```bash
sudo ln -s /etc/nginx/sites-available/doomsday-signal /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

5. **Add SSL with Let's Encrypt:**
```bash
sudo certbot --nginx -d yourdomain.com
```

---

## Optimization Tips

### Performance

**Enable compression:**
Most platforms automatically compress files, but verify:
- Gzip for text files (HTML, CSS, JS)
- Brotli for better compression (if supported)

**Optimize images (if added):**
```bash
# Install imagemin
npm install -D imagemin imagemin-mozjpeg imagemin-pngquant

# Add to build script
```

**Analyze bundle size:**
```bash
npm run build -- --mode analyze
```

### Caching

Configure cache headers for static assets:

```nginx
# Nginx example
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Environment Variables

If you add environment-specific configuration:

**Create `.env.production`:**
```bash
VITE_API_URL=https://api.example.com
```

**Access in code:**
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## Post-Deployment Checklist

After deploying, verify:

- [ ] Application loads without errors
- [ ] Clock animation works smoothly
- [ ] Signals can be added and deleted
- [ ] Data persists after page refresh
- [ ] Mobile layout works correctly
- [ ] All fonts load properly
- [ ] CSS animations perform well
- [ ] Console has no errors
- [ ] Performance is acceptable (Lighthouse score)

**Test on multiple browsers:**
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS/iOS)

**Test on multiple devices:**
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## Monitoring & Analytics (Optional)

### Add Analytics

**Option A: Plausible (Privacy-friendly)**
```html
<!-- Add to index.html -->
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

**Option B: Google Analytics**
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking

**Sentry (Recommended):**

```bash
npm install @sentry/react
```

Add to `src/main.tsx`:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

---

## Continuous Deployment

Enable automatic deployments on every push:

**GitHub Actions (any platform):**
- Workflows run on push
- Automatically build and deploy
- Preview deployments for PRs

**Vercel/Netlify:**
- Automatic deploys from Git
- Preview URLs for branches
- Production URL for main branch

---

## Domain Setup

### Custom Domain Configuration

1. **Purchase domain** (Namecheap, Google Domains, Cloudflare)

2. **Add DNS records:**

For **Vercel**:
```
A     @       76.76.21.21
CNAME www     cname.vercel-dns.com
```

For **Netlify**:
```
CNAME @       apex-loadbalancer.netlify.com
CNAME www     your-site.netlify.app
```

For **GitHub Pages**:
```
A     @       185.199.108.153
A     @       185.199.109.153
A     @       185.199.110.153
A     @       185.199.111.153
CNAME www     YOUR_USERNAME.github.io
```

3. **Enable HTTPS** (automatic on all platforms)

---

## Rollback Strategy

If deployment fails:

**Vercel/Netlify:**
- Go to Deployments tab
- Click "Rollback to this deployment" on previous version

**GitHub Pages:**
- Revert commit: `git revert HEAD`
- Push: `git push origin main`

**Self-hosted:**
- Keep previous `dist/` folder as backup
- Swap folders if needed

---

## Support

**Deployment issues?**
- Check build logs for errors
- Verify Node.js version compatibility
- Ensure all dependencies install correctly
- Test build locally first

**Platform-specific help:**
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)

---

**Successfully deployed? Share your URL in the project discussions! 🚀**
