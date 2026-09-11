# 🔑 API Keys Setup Guide - Shop My Fit

## Complete This Before Deploying to Netlify

You already have accounts for all three platforms - great! Let's get your API keys.

---

## 1️⃣ Perplexity AI API Key (For AI Features)

### What It Enables:
- ✨ Auto-generate product descriptions
- 🔍 Auto-find competitor pricing across platforms (Poshmark, Mercari, eBay, Depop)

### How to Get Your API Key:

**Step 1:** Go to Perplexity AI API Settings
```
https://www.perplexity.ai/settings/api
```

**Step 2:** Login to your Perplexity account

**Step 3:** Look for "API Keys" section

**Step 4:** Click "Create API Key" or "+ New API Key"

**Step 5:** Give it a name (e.g., "Shop My Fit")

**Step 6:** Copy the API key
- It will start with `pplx-`
- Example format: `pplx-abcd1234efgh5678ijkl9012mnop3456`

**Step 7:** Save it somewhere safe (you'll need it in a moment)

### ⚠️ Important Notes:
- The key is only shown once - copy it immediately
- This key will be used in your Admin Settings (not Netlify environment variables)
- Make sure you have credits on your Perplexity account (~$5-10/month usage expected)

---

## 2️⃣ SendGrid API Key (For Email Notifications)

### What It Enables:
- 📧 Order confirmation emails to you (the admin)
- 📬 Order notifications when customers place orders
- 🔔 Email alerts for new sales

### How to Get Your API Key:

**Step 1:** Go to SendGrid Dashboard
```
https://app.sendgrid.com/
```

**Step 2:** Login to your SendGrid account

**Step 3:** Navigate to Settings → API Keys
```
https://app.sendgrid.com/settings/api_keys
```

**Step 4:** Click "Create API Key" (blue button in top right)

**Step 5:** Choose API Key Type:
- Select "Full Access" (recommended)
- OR select "Restricted Access" and enable "Mail Send" permissions

**Step 6:** Give it a name
- Name: "Shop My Fit Production"

**Step 7:** Click "Create & View"

**Step 8:** Copy the API key immediately
- It will start with `SG.`
- Example format: `SG.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890AbCdEfGh`

**Step 9:** Save it somewhere safe

### ⚠️ Important: Verify Your Sender Email

**Before emails will work, you MUST verify a sender email:**

**Step 1:** Go to Settings → Sender Authentication
```
https://app.sendgrid.com/settings/sender_auth
```

**Step 2:** Click "Verify a Single Sender"

**Step 3:** Fill in your details:
- From Name: "Shop My Fit" (or your business name)
- From Email: Your email (e.g., `orders@yourdomain.com` or `yourname@gmail.com`)
- Reply To: Same email or different support email
- Company Address: Your address
- Nickname: "Shop My Fit Orders"

**Step 4:** Click "Create"

**Step 5:** Check your email inbox
- SendGrid will send a verification email
- Click the verification link

**Step 6:** Wait for confirmation
- Once verified, you'll see a green checkmark

**Step 7:** Note your verified sender email
- You'll need this as the `FROM_EMAIL` environment variable
- Example: `orders@yourdomain.com` or `yourname@gmail.com`

### 📝 What You Need from SendGrid:
1. ✅ **SENDGRID_API_KEY**: `SG.xxxxxxxxxxxx`
2. ✅ **FROM_EMAIL**: Your verified sender email (e.g., `orders@yourdomain.com`)

---

## 3️⃣ Stripe API Key (For Payment Processing)

### What It Enables:
- 💳 Accept credit card payments securely
- 🔒 PCI-compliant checkout
- 💰 Direct deposits to your bank account

### How to Get Your API Key:

**Step 1:** Go to Stripe Dashboard
```
https://dashboard.stripe.com/
```

**Step 2:** Login to your Stripe account

**Step 3:** Navigate to Developers → API keys
```
https://dashboard.stripe.com/test/apikeys
```

**Step 4:** Choose Test or Live Mode

**⚠️ IMPORTANT: Start with TEST MODE first!**

Toggle the "Test mode" switch in the top right corner (should show "Test mode ON")

**Step 5:** Locate Your Secret Key

You'll see two keys:
- **Publishable key** (starts with `pk_test_` or `pk_live_`) - NOT needed
- **Secret key** (starts with `sk_test_` or `sk_live_`) - THIS IS WHAT YOU NEED

**Step 6:** Reveal the Secret Key
- Click "Reveal test key" next to the Secret key
- The key will be displayed

**Step 7:** Copy the Secret Key
- Test key format: `sk_test_51AbCdEfGhIjKlMnOpQrStUvWx1234567890AbCdEfGhIjKlMnOpQrStUvWx1234567890AbCdEfGhIjKlMnOpQr`
- Copy the entire key

**Step 8:** Save it somewhere safe

### 🔄 Test Mode vs Live Mode

**For Initial Setup (Use Test Mode):**
- API Key: `sk_test_xxxxxxxxxxxx`
- Test with fake credit cards (no real charges)
- Test card number: `4242 4242 4242 4242`
- Any future expiration date (e.g., 12/34)
- Any CVC (e.g., 123)

**When Ready for Production (Switch to Live Mode):**
1. Toggle "Test mode" to OFF in Stripe dashboard
2. Go to Developers → API keys
3. Copy the **Live Secret key** (starts with `sk_live_`)
4. Update environment variable in Netlify
5. Now you can accept real payments!

### 📝 What You Need from Stripe:
- ✅ **STRIPE_SECRET_KEY**: `sk_test_xxxxxxxxxxxx` (for now)

---

## 📋 Your API Keys Checklist

Once you've collected all keys, you should have:

### ✅ Perplexity AI
- [ ] API Key: `pplx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- [ ] Account has credits

### ✅ SendGrid
- [ ] API Key: `SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- [ ] Sender email verified: `_________________________@____________`
- [ ] Received verification confirmation email

### ✅ Stripe
- [ ] Secret Key (Test): `sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- [ ] Confirmed in "Test mode"

---

## 🚀 Next Steps - Two Ways to Configure

### Option A: Configure AFTER Deploying (Recommended)

**Why?** You can deploy now and test the basic features, then add API keys incrementally.

1. Deploy to Netlify first (drag & drop)
2. Add Netlify environment variables:
   - Go to Netlify Dashboard → Site Settings → Environment Variables
   - Add `SENDGRID_API_KEY`
   - Add `FROM_EMAIL`
   - Add `STRIPE_SECRET_KEY`
   - Trigger redeploy
3. Add Perplexity key in Admin Settings on your live site

**Follow this guide:** `POST_DEPLOYMENT_CHECKLIST.md`

### Option B: Create Environment Variables File NOW

**Why?** Have everything ready before deployment.

Create a file called `.env` (for your reference only - DO NOT deploy this file):

```env
# Perplexity AI (Add in Admin Settings after deployment)
PERPLEXITY_API_KEY=pplx-your-actual-key-here

# SendGrid (Add in Netlify Environment Variables)
SENDGRID_API_KEY=SG.your-actual-key-here
FROM_EMAIL=your-verified-email@example.com

# Stripe (Add in Netlify Environment Variables)
STRIPE_SECRET_KEY=sk_test_your-actual-key-here
```

**⚠️ SECURITY WARNING:**
- DO NOT commit this .env file to Git
- DO NOT include it in your deployment folder
- This is just for your reference
- The actual keys go in Netlify Dashboard (not in code)

---

## 🔒 Security Best Practices

### ✅ DO:
- Store API keys in Netlify environment variables
- Use test mode for Stripe initially
- Verify SendGrid sender email
- Keep keys in password manager
- Rotate keys every 3-6 months

### ❌ DON'T:
- Never commit API keys to Git
- Never share keys in screenshots
- Never paste keys in public forums
- Never include keys in frontend code
- Never deploy .env files

---

## 🆘 Troubleshooting

### Perplexity API Key Issues:
- **"Invalid API key"**: Make sure it starts with `pplx-`
- **"Rate limit exceeded"**: Check your Perplexity account credits
- **"API key not found"**: You may need to create a new key

### SendGrid Issues:
- **"Sender email not verified"**: Check email inbox for verification link
- **"Invalid API key"**: Make sure it starts with `SG.` and has full access
- **"Emails not sending"**: Verify sender email is confirmed (green checkmark)

### Stripe Issues:
- **"Invalid API key"**: Make sure you copied the SECRET key (not publishable)
- **"Test mode required"**: Start with `sk_test_` key first
- **"Payment failed"**: Use test card: 4242 4242 4242 4242

---

## ✅ Ready to Proceed?

Once you have all three API keys:

1. ✅ Save them somewhere safe (password manager recommended)
2. ✅ Fill out the checklist above
3. ✅ Let me know you have them ready
4. ✅ We'll deploy to Netlify
5. ✅ We'll configure the environment variables together

---

## 📞 Need Help Getting Keys?

Let me know which platform you're having trouble with:
- "Having trouble with Perplexity"
- "SendGrid sender email not verifying"
- "Can't find Stripe secret key"

I'll provide detailed step-by-step screenshots and guidance!

---

**Once you have all three keys, we're ready to deploy! 🚀**
