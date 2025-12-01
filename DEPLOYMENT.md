# Deployment Guide for Quinser Pharmaceuticals Website

This guide provides step-by-step instructions for hosting your React + Vite application.

## Option 1: Vercel (Recommended - Easiest)

Vercel is the easiest option and works perfectly with React apps.

### Steps:

1. **Build your project locally first (test it):**
   ```bash
   npm run build
   npm run preview
   ```
   Visit `http://localhost:4173` to verify everything works.

2. **Push your code to GitHub:**
   - If not already done, create a GitHub repository
   - Push your code:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git remote add origin https://github.com/YOUR_USERNAME/quinser-app.git
     git push -u origin main
     ```

3. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project
   - Click "Deploy"
   - Your site will be live in ~2 minutes!

4. **Your site URL:**
   - Vercel will give you a URL like: `https://quinser-app.vercel.app`
   - You can add a custom domain later in project settings

---

## Option 2: Netlify

Netlify is another excellent option with similar ease of use.

### Steps:

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Push to GitHub** (same as Vercel steps above)

3. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click "Deploy site"

4. **Your site URL:**
   - Netlify will give you: `https://random-name.netlify.app`
   - You can customize it in Site settings → Change site name

---

## Option 3: GitHub Pages

Free hosting directly from GitHub (requires a bit more setup).

### Steps:

1. **Install gh-pages package:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json:**
   Add these scripts:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview",
     "deploy": "npm run build && gh-pages -d dist"
   },
   "homepage": "https://YOUR_USERNAME.github.io/quinser-app"
   ```

3. **Update vite.config.js:**
   ```js
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/quinser-app/', // Replace with your repo name
   })
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to your GitHub repo → Settings → Pages
   - Source: Select "gh-pages" branch
   - Your site will be at: `https://YOUR_USERNAME.github.io/quinser-app`

---

## Option 4: Traditional Web Hosting (cPanel, etc.)

If you have traditional web hosting:

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder:**
   - Connect via FTP/SFTP
   - Upload all contents of the `dist` folder to your `public_html` or `www` directory

3. **Configure your server:**
   - Ensure your server supports SPA (Single Page Application) routing
   - You may need to add a `.htaccess` file (for Apache) or configure nginx

---

## Important Notes:

### Before Deploying:

1. **Test the build locally:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Check for environment variables:**
   - If you have any API keys or secrets, use environment variables
   - Don't commit sensitive data to GitHub

3. **Verify all assets load correctly:**
   - Check that images in `/public/assets/` are accessible
   - Test all routes work correctly

### After Deploying:

1. **Test all pages:**
   - Home, Products, Manufacturing, Team, Contact
   - Check navigation works
   - Verify images load

2. **Set up custom domain (optional):**
   - Vercel/Netlify: Add domain in project settings
   - Update DNS records as instructed

3. **Enable HTTPS:**
   - Vercel/Netlify: Automatic
   - GitHub Pages: Automatic
   - Traditional hosting: May need SSL certificate

---

## Quick Comparison:

| Platform | Difficulty | Free Tier | Custom Domain | Best For |
|----------|-----------|-----------|----------------|----------|
| **Vercel** | ⭐ Easy | ✅ Yes | ✅ Free | React apps |
| **Netlify** | ⭐ Easy | ✅ Yes | ✅ Free | Static sites |
| **GitHub Pages** | ⭐⭐ Medium | ✅ Yes | ✅ Free | Open source |
| **Traditional** | ⭐⭐⭐ Hard | ❌ Paid | ✅ Yes | Full control |

**Recommendation:** Start with **Vercel** - it's the easiest and works perfectly for React apps!


