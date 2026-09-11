# 🖤 Shop My Fit - Complete E-Commerce Platform

> *You just stepped into my closet. Welcome.*

A fully-featured, AI-powered e-commerce platform for selling curated clothing and accessories.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/shop-my-fit)

---

## ⚡ Quick Start

### 🚀 Deploy in 3 Minutes

1. **Drag & Drop to Netlify**:
   - Go to https://app.netlify.com/drop
   - Drag the entire project folder
   - Your store is live! 🎉

2. **Initial Setup**:
   - Click "Admin" → Login with `admin123`
   - **Change password immediately!**
   - Add your first product

3. **Go Live**:
   - Share your Netlify URL
   - Start selling!

**Detailed instructions**: See [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md)

---

## ✨ Features

### 🎨 Customer Experience
- 🛍️ Beautiful product catalog with images/videos
- 🔍 Real-time search across products
- 🏷️ Category filtering
- 🛒 Shopping cart
- 💳 Multiple payment options (Stripe, Cash App, Zelle, PayPal, Venmo)
- 🎟️ Discount code system
- 👤 Customer accounts & order history
- 📦 Order tracking
- 📱 Mobile-responsive design

### 🤖 AI-Powered Features
- ✨ **Auto-generate product descriptions** (Perplexity AI)
- 🔍 **Auto-find competitor pricing** (Poshmark, Mercari, eBay)
- 💡 Smart recommendations

### 📊 Admin Dashboard
- 📈 Sales analytics with interactive charts
- 📦 Inventory management with stock tracking
- 📝 Order management with status updates
- 💰 Discount code creation
- 📧 Email notifications (SendGrid)
- 💳 Stripe payment processing
- 🔒 Secure admin authentication

### 🛠️ Technical
- ⚡ Netlify deployment ready
- 🔐 Backend API functions
- 📊 Chart.js analytics
- 💾 LocalStorage data persistence
- 🔒 Security headers configured
- 📱 PWA-ready

---

## 📂 Project Files

```
📦 shop-my-fit/
├── 📄 shop-my-fit.html         ← Main application (open in browser)
├── 📄 index.html               ← Landing page
├── 📁 netlify/
│   └── 📁 functions/
│       ├── send-email.js       ← Email API
│       └── create-stripe-checkout.js  ← Payment API
│
├── 📘 README.md                ← You are here
├── 📘 DEPLOYMENT_GUIDE.md      ← How to deploy
├── 📘 BACKEND_INTEGRATION.md   ← API setup
├── 📘 NEW_FEATURES.md          ← Feature docs
└── 📘 IMPLEMENTATION_SUMMARY.md ← Complete overview
```

---

## 🎯 Use Cases

### Perfect For:
- 👚 Personal clothing resale stores
- 👜 Boutique vintage shops
- 👗 Fashion influencer stores
- 🛍️ Small business e-commerce
- 🎨 Curated product collections
- 🏪 Online consignment stores

### Not Suitable For:
- Large-scale inventory (100+ SKUs)
- Multi-vendor marketplaces
- High-traffic stores (>1000 orders/month)
- Complex shipping calculations
- International multi-currency

---

## 💻 Tech Stack

### Frontend:
- HTML5, CSS3, JavaScript (Vanilla)
- Chart.js for analytics
- Stripe.js for payments

### Backend:
- Netlify Functions (serverless)
- SendGrid for emails
- Stripe for payments
- Perplexity AI for product intelligence

### Storage:
- Browser localStorage (client-side)
- *Recommended upgrade*: Firebase/Supabase for production

---

## 🔧 Configuration

### Required API Keys:

#### 1. Perplexity AI (Product descriptions & pricing)
- Sign up: https://www.perplexity.ai
- Get key: https://www.perplexity.ai/settings/api
- Cost: Free tier + ~$0.20 per 1M tokens

#### 2. SendGrid (Email notifications)
- Sign up: https://sendgrid.com
- Free tier: 100 emails/day
- Setup: Create sender email + API key

#### 3. Stripe (Payment processing)
- Sign up: https://stripe.com
- Free to use (2.9% + $0.30 per transaction)
- Get keys: Dashboard → Developers → API keys

### Environment Variables (Netlify):
```bash
SENDGRID_API_KEY=SG.xxxxx
FROM_EMAIL=orders@yourdomain.com
STRIPE_SECRET_KEY=sk_live_xxxxx
```

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md) | Complete Netlify deployment instructions |
| [`BACKEND_INTEGRATION.md`](BACKEND_INTEGRATION.md) | API setup & configuration |
| [`NEW_FEATURES.md`](NEW_FEATURES.md) | Detailed feature documentation |
| [`IMPLEMENTATION_SUMMARY.md`](IMPLEMENTATION_SUMMARY.md) | Complete technical overview |

---

## 🚀 Development

### Local Development:
```bash
# Install dependencies
npm install

# Run local development server
netlify dev

# Access at http://localhost:8888
```

### Testing:
```bash
# Test email function
curl -X POST http://localhost:8888/.netlify/functions/send-email \
  -H "Content-Type: application/json" \
  -d '{"to":"test@email.com","subject":"Test","body":"Hello"}'

# Test payment function
curl -X POST http://localhost:8888/.netlify/functions/create-stripe-checkout \
  -H "Content-Type: application/json" \
  -d '{"items":[{"title":"Test","price":25}],"customerInfo":{"email":"test@email.com"}}'
```

---

## 🔒 Security

### Current Implementation:
- ✅ HTTPS (automatic with Netlify)
- ✅ Admin password protection
- ✅ Password recovery system
- ✅ Security questions
- ✅ Client-side data validation
- ⚠️ LocalStorage for data (browser-specific)
- ⚠️ Plain text passwords (demo only)

### Production Recommendations:
1. **Implement password hashing** (bcrypt)
2. **Migrate to backend database** (Firebase/Supabase)
3. **Add JWT authentication** for customer accounts
4. **Enable rate limiting** on API endpoints
5. **Add CAPTCHA** for signup/login
6. **Implement CSP headers**
7. **Regular security audits**

---

## 💰 Pricing

### Free Tier (Perfect for Starting):
| Service | Free Tier |
|---------|-----------|
| Netlify | 100GB bandwidth/month |
| Perplexity AI | Free tier + pay per use |
| Stripe | 2.9% + $0.30 per transaction |
| SendGrid | 100 emails/day |

**Monthly Cost**: $0 + transaction fees

### Growing Store:
| Service | Cost |
|---------|------|
| Netlify Pro | $19/month |
| Perplexity AI | ~$10/month (500 products) |
| Stripe | Transaction fees only |
| SendGrid Essential | $15/month (40K emails) |

**Monthly Cost**: ~$44 + transaction fees

---

## 📈 Analytics

Built-in analytics dashboard includes:
- 💰 Total Revenue
- 📦 Total Orders
- 🛍️ Items Sold
- 📊 Average Order Value
- 📈 Revenue Over Time
- 💳 Sales by Payment Method
- 🏷️ Sales by Category
- ⭐ Top Selling Items

---

## 🆘 Support

### Self-Help:
1. Check [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md)
2. Review browser console (F12)
3. Clear browser cache & try incognito mode

### Common Issues:

**Can't login to admin?**
- Default password: `admin123`
- Clear browser cache
- Check Caps Lock

**AI features not working?**
- Verify Perplexity API key in Admin → Settings
- Check browser console for errors
- Ensure API key starts with `pplx-`

**Orders not saving?**
- LocalStorage must be enabled
- Don't use incognito/private mode
- Check browser console for errors

**Email not sending?**
- Currently logs to console (demo mode)
- See [`BACKEND_INTEGRATION.md`](BACKEND_INTEGRATION.md) for SendGrid setup

---

## 🗺️ Roadmap

### ✅ Completed (v2.0):
- [x] Full e-commerce functionality
- [x] AI product descriptions
- [x] AI price research
- [x] Customer accounts
- [x] Order history
- [x] Netlify deployment
- [x] Backend API functions
- [x] Analytics dashboard

### 🔄 In Progress:
- [ ] Password hashing
- [ ] Backend database migration
- [ ] Customer email receipts
- [ ] Abandoned cart recovery

### 🔮 Future:
- [ ] Product reviews
- [ ] Wishlist feature
- [ ] Mobile app
- [ ] Advanced inventory management
- [ ] Multi-language support
- [ ] Loyalty program

---

## 📜 License

MIT License - Feel free to use for personal or commercial projects

---

## 🙏 Acknowledgments

Built with:
- [Chart.js](https://www.chartjs.org/) for analytics
- [Stripe](https://stripe.com/) for payments
- [Netlify](https://www.netlify.com/) for hosting
- [Perplexity AI](https://www.perplexity.ai/) for intelligence
- [SendGrid](https://sendgrid.com/) for emails

---

## 📞 Contact

For questions, issues, or feature requests, check the documentation first!

---

## ⚡ TL;DR

```bash
# 1. Deploy
Drag folder to https://app.netlify.com/drop

# 2. Configure
Admin → Settings → Add API keys

# 3. Launch
Add products, set prices, go live! 🚀
```

---

**Made with 🖤 for Shop My Fit**

*You just stepped into my closet. Welcome.*
