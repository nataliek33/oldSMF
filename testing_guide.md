# Shop My Fit - Testing Guide

## 🧪 Comprehensive Testing Checklist

Use this guide to test all features and ensure everything works correctly before launch.

---

## ✅ Pre-Testing Setup

### 1. Open the Application
- Open `shop-my-fit.html` in a modern browser (Chrome, Firefox, Safari, Edge)
- Open browser console (F12) to check for errors
- Use incognito/private mode for fresh testing

### 2. Clear Browser Data (If Testing Again)
```javascript
// Run in browser console to reset all data:
localStorage.clear();
location.reload();
```

---

## 🧪 Test Suite

### Test 1: Basic Product Browsing ✅

**Steps:**
1. ✓ Page loads without errors
2. ✓ Header displays "Shop My Fit" logo
3. ✓ Intro section shows welcome message
4. ✓ Search bar is visible
5. ✓ Category filter dropdown works
6. ✓ Cart shows "0" items initially

**Expected Result:** Clean, professional homepage loads

---

### Test 2: Admin Login & Security 🔒

**Steps:**
1. Click "Admin" button
2. Try wrong password → Should show error
3. Enter correct password: `admin123`
4. Click "Login" → Should access admin panel

**Test Password Recovery:**
1. Click "Forgot Password?"
2. Try entering random recovery code → Should fail
3. Try wrong security question answers → Should fail
4. Close modal

**Test Password Change:**
1. In admin panel → Settings tab
2. Enter current password: `admin123`
3. Enter new password (min 6 chars)
4. Confirm password
5. Click "Change Password"
6. Logout → Login with new password

**Expected Result:** Security features work correctly

---

### Test 3: Customer Account System 👤

**Test Signup:**
1. Click "Sign In" button (blue)
2. Click "Create Account"
3. Fill in:
   - Name: "Test Customer"
   - Email: "test@example.com"
   - Password: "test123"
   - Confirm: "test123"
4. Click "Create Account"
5. Should see success message
6. Should auto-login and show "Test" in header

**Test Login:**
1. If logged in, sign out
2. Click "Sign In"
3. Enter email: "test@example.com"
4. Enter password: "test123"
5. Click "Sign In"
6. Should login successfully

**Test Logout:**
1. Click "Test" (account button) in header
2. Click "Sign Out"
3. Confirm logout
4. Header should show "Sign In" button again

**Expected Result:** Full account lifecycle works

---

### Test 4: AI Product Description (Perplexity) ✨

**Setup:**
1. Login as admin
2. Go to Settings → AI Integration Settings
3. Enter your Perplexity API key (from https://www.perplexity.ai/settings/api)
4. Click "Save AI Settings"

**Test AI Description:**
1. Go to "Add New Item" tab
2. Upload at least one image
3. Fill in:
   - Title: "Blue Floral Summer Dress"
   - Category: "Dresses"
   - Size: "S"
4. Click "✨ Generate Description with AI"
5. Wait for API response
6. Description field should populate with AI-generated text

**Expected Result:** AI generates relevant product description

**Error Cases:**
- No API key → Should show error
- No title/category → Should ask to fill fields first
- API error → Should show error message

---

### Test 5: AI Price Finder (Perplexity) 🔍

**Test Price Search:**
1. In "Add New Item" (with Perplexity API key configured)
2. Upload image(s)
3. Fill in:
   - Title: "Lululemon Align Leggings"
   - Category: "Jeans" (or appropriate)
   - Size: "4"
4. Click "🔍 Find Compare Price"
5. Wait for search (may take 10-20 seconds)
6. "Compare At Price" field should populate with average price

**Expected Result:** Finds competitor pricing and auto-fills

**Test Edge Cases:**
- Obscure product → May return 0 or low confidence
- Generic title → Should still search
- No API key → Should error

---

### Test 6: Product Creation with Size Field 📏

**Test Complete Product:**
1. Admin panel → Add New Item
2. Upload 2-3 images
3. Click "✨ Generate Description" (if API key set)
4. Click "🔍 Find Compare Price" (if API key set)
5. Fill in:
   - Title: (or use AI generated)
   - Category: Select any
   - **Size: "M"** ← NEW FIELD
   - Price: "25.00"
   - Compare Price: (or use AI found price)
   - Description: (or use AI generated)
   - Stock: "1"
6. Click "Save Product"
7. Success message should appear

**Verify Size Display:**
1. Go back to main store page
2. Find your product
3. Should show "Size: M" below category
4. Check in cart → Size should display
5. Check in orders → Size should display

**Expected Result:** Size field works throughout app

---

### Test 7: Product Search Functionality 🔍

**Test Search:**
1. Go to main store page
2. Type in search box: "blue"
3. Products with "blue" in title/description should show
4. Type: "dress"
5. Dresses category items should show
6. Type: "M" (the size)
7. Products with size M should show
8. Clear search → All products show

**Expected Result:** Real-time search across title, description, category, size

---

### Test 8: Shopping Cart & Checkout 🛒

**Test Add to Cart:**
1. Browse products
2. Click "Add to Cart" on a product
3. Cart count should increase
4. Click cart icon
5. Product should be in cart

**Test Discount Code:**
1. Admin panel → Payment Settings
2. Click "Add New Discount Code"
3. Create code: "TEST10"
4. Type: Percentage
5. Value: 10
6. Min purchase: 0
7. Code should appear in list

**Test Checkout with Discount:**
1. Add product to cart (e.g., $25)
2. Click cart → "Proceed to Checkout"
3. If logged in as customer:
   - Name and email should auto-fill ✓
4. Enter discount code: "TEST10"
5. Click "Apply"
6. Should show: Subtotal $25, Discount -$2.50, Total $22.50

**Test Payment:**
1. Fill in shipping info
2. Choose payment method (Cash App, Zelle, etc.)
3. Click "Complete Order"
4. Confirm payment sent
5. Success message should appear
6. Cart should clear

**Expected Result:** Full checkout flow works with discounts

---

### Test 9: Customer Order History 📋

**Test Order Tracking:**
1. After placing order, click "Test" (account button)
2. My Account modal should open
3. Order history should show:
   - Order ID
   - Date
   - Status badge (PENDING)
   - Items with sizes
   - Discount applied (if used)
   - Total amount

**Expected Result:** Customer can see all their orders

---

### Test 10: Admin Order Management 📊

**Test Order List:**
1. Login as admin
2. Go to "Orders" tab
3. Should see the test order
4. Shows customer info, items, total

**Test Status Update:**
1. Change status dropdown: PENDING → PROCESSING
2. Should update immediately
3. Change to: SHIPPED
4. Should update

**Test Email Notification (if configured):**
1. Settings → Email Notification Settings
2. Enter your email
3. Enable "Order status change" notifications
4. Change order status
5. Check console for email log (demo mode)

**Expected Result:** Order management works smoothly

---

### Test 11: Analytics Dashboard 📈

**Test Analytics:**
1. Admin panel → Analytics tab
2. Should show:
   - Total Revenue (sum of orders)
   - Total Orders count
   - Items Sold count
   - Average Order Value

**Test Charts:**
1. Payment Method chart should show distribution
2. Category chart should show sales by category
3. Revenue chart should show timeline
4. Top Categories should show progress bars

**Expected Result:** Charts render correctly with data

---

### Test 12: Inventory Management 📦

**Test Stock Tracking:**
1. Admin → Manage Items
2. Should show stock count for each product
3. Note stock level of test product

**Test Stock Depletion:**
1. Place order for product with stock = 1
2. Go to Manage Items
3. Stock should now be 0
4. Product should show "SOLD OUT"
5. On main page, product should show "Sold Out" badge
6. "Add to Cart" button should be disabled

**Expected Result:** Stock updates automatically

---

### Test 13: Payment Settings Configuration 💳

**Test Payment Methods:**
1. Admin → Payment Settings
2. Enter:
   - Cash App: "$yourcashtag"
   - Zelle: "your@email.com"
   - PayPal: "your@email.com"
   - Venmo: "@yourusername" (optional)
3. Save settings
4. Go to checkout as customer
5. Payment options should show your info

**Test Venmo Visibility:**
1. If Venmo handle entered → Button appears
2. If empty → Button hidden

**Expected Result:** Payment info updates in checkout

---

### Test 14: Mobile Responsiveness 📱

**Test on Mobile:**
1. Open on phone OR use Chrome DevTools (F12 → Toggle device toolbar)
2. Select iPhone/Android device
3. Test:
   - ✓ Header stacks vertically
   - ✓ Products grid adjusts
   - ✓ Search bar full width
   - ✓ Cart modal fills screen
   - ✓ Admin panel usable
   - ✓ Forms stack properly
   - ✓ Buttons tap-friendly

**Expected Result:** Fully responsive on all devices

---

### Test 15: Error Handling 🚨

**Test Error Cases:**
1. Try adding product without images → Should error
2. Try empty form submission → Should validate
3. Try invalid email in signup → Should validate
4. Try password mismatch → Should error
5. Try applying invalid discount code → Should error
6. Try AI features without API key → Should error
7. Check console for no JavaScript errors

**Expected Result:** Graceful error handling everywhere

---

## 🐛 Known Limitations (By Design)

### LocalStorage Data:
- ⚠️ Data stored in browser only
- ⚠️ Clearing cache = losing all data
- ⚠️ Not shared across devices
- ⚠️ Not suitable for production at scale

### Security:
- ⚠️ Passwords stored in plain text
- ⚠️ No encryption
- ⚠️ Client-side only
- 🔒 For production: Use backend + hashing

### Email Notifications:
- ℹ️ Currently logs to console (demo)
- ℹ️ Requires Netlify + SendGrid for real emails
- ℹ️ See BACKEND_INTEGRATION.md

### Stripe Payments:
- ℹ️ Frontend-only demo
- ℹ️ Requires Netlify Function for real processing
- ℹ️ See BACKEND_INTEGRATION.md

---

## ✅ Testing Checklist

Use this quick checklist:

- [ ] Admin login works
- [ ] Customer signup/login works
- [ ] AI description generates (with API key)
- [ ] AI price finder works (with API key)
- [ ] Size field shows on products
- [ ] Search works (title, desc, category, size)
- [ ] Add to cart works
- [ ] Discount codes apply correctly
- [ ] Checkout completes
- [ ] Order appears in customer account
- [ ] Order appears in admin panel
- [ ] Status updates work
- [ ] Stock decreases on purchase
- [ ] Analytics show correct data
- [ ] Charts render properly
- [ ] Mobile responsive
- [ ] No console errors

---

## 🔧 Troubleshooting

### Issue: "AI features not working"
**Solution:**
1. Verify API key in Settings → AI Integration
2. Check key starts with `pplx-`
3. Check browser console for errors
4. Verify internet connection

### Issue: "Products not saving"
**Solution:**
1. Check localStorage is enabled
2. Not in private/incognito mode?
3. Check browser console for errors

### Issue: "Charts not showing"
**Solution:**
1. Place at least one order first
2. Refresh page
3. Check Chart.js loaded (view page source)

### Issue: "Customer auto-fill not working"
**Solution:**
1. Ensure logged in before checkout
2. Check customer account has email set
3. Clear form and try again

---

## 📊 Test Results Template

Copy and fill this out:

```
TESTING COMPLETED: [Date]
Browser: [Chrome/Firefox/Safari/Edge]
Version: [Browser version]

✅ Admin Login: PASS / FAIL
✅ Customer Accounts: PASS / FAIL
✅ AI Description: PASS / FAIL / SKIPPED (no API key)
✅ AI Pricing: PASS / FAIL / SKIPPED (no API key)
✅ Size Field: PASS / FAIL
✅ Search: PASS / FAIL
✅ Shopping Cart: PASS / FAIL
✅ Discount Codes: PASS / FAIL
✅ Checkout: PASS / FAIL
✅ Order History: PASS / FAIL
✅ Admin Orders: PASS / FAIL
✅ Analytics: PASS / FAIL
✅ Stock Management: PASS / FAIL
✅ Mobile: PASS / FAIL

Issues Found:
1. [Describe any issues]

Overall Status: READY TO DEPLOY / NEEDS FIXES
```

---

## 🚀 Ready to Launch?

If all tests pass:
1. ✅ Clear test data: `localStorage.clear()`
2. ✅ Deploy to Netlify (see DEPLOYMENT_GUIDE.md)
3. ✅ Configure production API keys
4. ✅ Add real products
5. ✅ Go live! 🎉

---

**Happy Testing! 🧪**
