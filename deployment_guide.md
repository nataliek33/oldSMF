# Shop My Fit - Deployment Guide

## 🚀 Deploy to Netlify (Recommended - Free & Easy)

### Method 1: Netlify Drop (Easiest - No Git Required)

1. **Go to Netlify Drop**: https://app.netlify.com/drop
2. **Drag and drop** the entire project folder
3. **Your site is live!** You'll get a URL like `https://random-name.netlify.app`
4. **Optional**: Change site name in Site Settings → Domain Management

### Method 2: Deploy via Git (Recommended for Updates)

#### Step 1: Initialize Git Repository

```bash
cd /home/user/workspaces/6977df70ac12f2976e7b2a5a/7d2cad19-72e7-489f-b421-c27301a0d5e5
git init
git add .
git commit -m "Initial commit: Shop My Fit e-commerce platform"
```

#### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Name: `shop-my-fit`
3. Keep it Private (recommended for business)
4. Don't initialize with README
5. Click "Create repository"

#### Step 3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/shop-my-fit.git
git branch -M main
git push -u origin main
```

#### Step 4: Connect to Netlify

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Select your `shop-my-fit` repository
5. Build settings:
   - **Build command**: Leave empty
   - **Publish directory**: `.` (current directory)
6. Click "Deploy site"

#### Step 5: Configure Domain (Optional)

1. In Netlify: Site Settings → Domain Management
2. Click "Add custom domain"
3. Enter your domain (e.g., `shopmyfit.com`)
4. Follow DNS setup instructions

---

## 🔑 Post-Deployment Configuration

### 1. Set Up Admin Account

1. Visit your deployed site
2. Click "Admin" button
3. Login with default password: `admin123`
4. **IMMEDIATELY** go to Settings tab and:
   - Change admin password
   - Set up security questions
   - Save recovery code

### 2. Configure Perplexity AI

1. Get API key from: https://www.perplexity.ai/settings/api
2. In admin panel: Settings → AI Integration Settings
3. Enter your Perplexity API key
4. Click "Save AI Settings"

**Features enabled:**
- ✨ Auto-generate product descriptions
- 🔍 Auto-find competitor pricing from Poshmark, Mercari, etc.

### 3. Configure Payment Methods

1. Admin Panel → Payment Settings tab
2. Enter your payment handles:
   - Cash App: `$yourusername`
   - Zelle: your email/phone
   - PayPal: your email
   - Venmo: `@yourusername` (optional)
3. Click "Save Payment Settings"

### 4. Set Up Email Notifications

1. Admin Panel → Settings → Email Notification Settings
2. Enter your email address
3. Enable notifications:
   - ✅ New order notifications
   - ✅ Order status change notifications
4. Click "Save Email Settings"

**Note**: This logs to console for now. For production emails, see "Backend Integration" section.

---

## 📊 Environment Variables (for Netlify Functions - Optional)

If you add Netlify Functions later for backend features:

1. Netlify Dashboard → Site Settings → Environment Variables
2. Add:
   - `PERPLEXITY_API_KEY`: Your Perplexity key (secure)
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `SENDGRID_API_KEY`: For email notifications

---

## 🔒 Security Best Practices

### For localStorage Usage:

⚠️ **Important**: Current version stores all data in browser localStorage. This means:
- Data is client-side only
- Clearing cache = losing data
- Not suitable for multi-admin access

**For Production**, consider migrating to:
1. Backend database (Firebase, Supabase, MongoDB)
2. User authentication (Auth0, Firebase Auth)
3. Server-side order processing

### HTTPS & Security

- Netlify provides free SSL automatically
- All connections are encrypted
- API keys stored in localStorage are browser-specific

---

## 🛠️ Updating Your Deployed Site

### Via Netlify Drop:
1. Make changes to your files
2. Drag and drop the entire folder again
3. Netlify will update your site

### Via Git:
```bash
git add .
git commit -m "Update: [describe changes]"
git push origin main
```
Netlify auto-deploys on push!

---

## 🌐 Custom Domain Setup

### Option 1: Use Netlify DNS (Easiest)

1. Buy domain from any registrar (Namecheap, GoDaddy, etc.)
2. Netlify: Domain Management → "Add custom domain"
3. Enter your domain
4. Update nameservers at your registrar to Netlify's:
   - `dns1.p03.nsone.net`
   - `dns2.p03.nsone.net`
   - `dns3.p03.nsone.net`
   - `dns4.p03.nsone.net`

### Option 2: External DNS

1. Add domain in Netlify
2. Create A record pointing to Netlify's load balancer:
   - `75.2.60.5`
3. Add CNAME record for `www`:
   - `your-site.netlify.app`

---

## 📱 PWA Support (Progressive Web App)

Want customers to "install" your store on their phones?

Create `manifest.json`:
```json
{
  "name": "Shop My Fit",
  "short_name": "Shop My Fit",
  "description": "Curated clothing resale",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#d946ef",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

Add to `shop-my-fit.html` `<head>`:
```html
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#d946ef">
```

---

## 🔍 SEO Optimization

Add these meta tags to `shop-my-fit.html` `<head>`:

```html
<meta name="description" content="Shop My Fit - Curated designer resale clothing. Find your perfect fit!">
<meta name="keywords" content="resale clothing, designer clothes, sustainable fashion, online boutique">

<!-- Open Graph for Social Media -->
<meta property="og:title" content="Shop My Fit">
<meta property="og:description" content="Curated designer resale clothing">
<meta property="og:image" content="https://your-domain.com/preview-image.jpg">
<meta property="og:url" content="https://your-domain.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Shop My Fit">
<meta name="twitter:description" content="Curated designer resale clothing">
<meta name="twitter:image" content="https://your-domain.com/preview-image.jpg">
```

---

## 📊 Analytics Setup

### Google Analytics (Free)

1. Get tracking ID from https://analytics.google.com
2. Add to `shop-my-fit.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🐛 Troubleshooting

### Site Not Loading
- Check Netlify deploy logs for errors
- Verify `netlify.toml` is in root directory
- Clear browser cache

### AI Features Not Working
- Verify Perplexity API key is correct
- Check browser console for errors
- Ensure API key starts with `pplx-`

### Payment Info Not Updating
- Check Payment Settings tab
- Click "Save Payment Settings"
- Refresh checkout page

### Orders Not Saving
- Check browser localStorage is enabled
- Don't use incognito/private mode
- Check browser console for errors

---

## 📧 Support & Documentation

- **Feature Documentation**: See `NEW_FEATURES.md`
- **Technical Issues**: Check browser console (F12)
- **Netlify Support**: https://docs.netlify.com

---

## 🎯 Next Steps After Deployment

1. ✅ Test all features end-to-end
2. ✅ Create first product listing
3. ✅ Test checkout flow
4. ✅ Create discount codes for launch
5. ✅ Share your store link!

---

## 🚀 Go Live Checklist

- [ ] Changed admin password from default
- [ ] Set up security questions
- [ ] Saved recovery code
- [ ] Configured all payment methods
- [ ] Added Perplexity API key
- [ ] Set up email notifications
- [ ] Added at least 5 products
- [ ] Tested checkout flow
- [ ] Created launch discount code
- [ ] Set up custom domain (optional)
- [ ] Added Google Analytics (optional)
- [ ] Tested on mobile device

---

**Your Shop My Fit store is ready to launch! 🎉**
