# Library Management System - Netlify Deployment Guide

## Overview
This app is now configured for **Netlify Functions** (serverless). Your Express backend runs as a serverless function.

## Deployment Steps

### 1. Install `serverless-http` dependency
```bash
npm install serverless-http
```

### 2. Push changes to GitHub
```bash
cd "d:\Library Management System"
git add .
git commit -m "Add Netlify serverless configuration"
git push origin main
```

### 3. Connect to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up/log in
2. Click **"New site from Git"**
3. Select **GitHub** and authorize Netlify
4. Choose your repository: `Library-Management-System`
5. Netlify will auto-detect the build settings from `netlify.toml`
6. Click **"Deploy site"**

### 4. Configure Environment Variables (if needed)
- Go to **Site settings** → **Build & deploy** → **Environment**
- Add any environment variables (PORT, NODE_ENV, etc.)

### 5. View Your Live Site
- Your app will be live at: `https://<your-site-name>.netlify.app`
- All routes (`/`, `/issue`, `/return`, `/delete`) will work through the serverless API

## Important Notes

⚠️ **Data Persistence**: Books are stored in memory. They will reset when the function restarts. For production, use a database like MongoDB or Firebase.

⚠️ **EJS Views**: Make sure `view/home.ejs` is accessible in the Netlify build. Check the `public` folder configuration.

⚠️ **Static Files**: Place CSS, images, and other assets in the `public/` folder for proper serving.

## Local Testing (Optional)
To test the serverless function locally:
```bash
npm install -g netlify-cli
netlify dev
# App runs at http://localhost:8888
```

## Troubleshooting

**Issue: "404 Not Found"**
- Check `netlify.toml` redirects are correct
- Verify `view/home.ejs` exists in the project

**Issue: "EJS template not found"**
- Move `view/home.ejs` to `views/home.ejs` (pluralize folder name)
- Update the view engine path in `netlify/functions/api.js`

**Issue: Styles not loading**
- Move CSS to `public/` folder
- Update paths in HTML to reference `/style.css` instead of relative paths

---

**Questions?** Check Netlify docs: https://docs.netlify.com/functions/overview/
