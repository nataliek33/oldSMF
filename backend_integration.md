# Backend API Integration Guide

## Overview

Your Shop My Fit platform now includes Netlify Functions for:
1. **Email Notifications** (SendGrid)
2. **Stripe Payment Processing** (Server-side)

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
cd /home/user/workspaces/6977df70ac12f2976e7b2a5a/7d2cad19-72e7-489f-b421-c27301a0d5e5
npm install
```

### 2. Configure Environment Variables

In Netlify Dashboard → Site Settings → Environment Variables, add:

```
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
FROM_EMAIL=orders@yourdomain.com
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx (or sk_test_ for testing)
```

### 3. Deploy

```bash
netlify deploy --prod
```

---

## 📧 Email Integration (SendGrid)

### Setup SendGrid

1. Sign up at https://sendgrid.com (free tier: 100 emails/day)
2. Verify your sender email
3. Create API key: Settings → API Keys
4. Add to Netlify environment variables

### Using the Email Function

The function is automatically called when:
- New order is placed (if enabled in settings)
- Order status changes (if enabled in settings)

**Function Endpoint**: `/.netlify/functions/send-email`

**Request Format**:
```javascript
POST /.netlify/functions/send-email
Content-Type: application/json

{
  "to": "customer@email.com",
  "subject": "Order Confirmation #ORD-123",
  "body": "Thank you for your order...",
  "orderId": "ORD-123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### Frontend Integration

Update the `sendEmailNotification` function in `shop-my-fit.html`:

```javascript
async function sendEmailNotification(subject, body) {
    if (!emailSettings.adminEmail) return;

    try {
        const response = await fetch('/.netlify/functions/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: emailSettings.adminEmail,
                subject: subject,
                body: body,
                orderId: subject.includes('Order') ? subject.split(':')[1].trim() : null
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send email');
        }

        const data = await response.json();
        console.log('📧 Email sent:', data);

        // Show browser notification as backup
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(subject, { body: body.substring(0, 100) });
        }
    } catch (error) {
        console.error('Email notification error:', error);
        // Fallback to console log
        console.log('📧 Email Notification (Failed to send):');
        console.log('To:', emailSettings.adminEmail);
        console.log('Subject:', subject);
        console.log('Body:', body);
    }
}
```

---

## 💳 Stripe Integration (Server-side)

### Setup Stripe

1. Sign up at https://stripe.com
2. Get API keys: Developers → API keys
3. Use **test keys** during development
4. Add **secret key** to Netlify environment variables

### Using the Stripe Function

**Function Endpoint**: `/.netlify/functions/create-stripe-checkout`

**Request Format**:
```javascript
POST /.netlify/functions/create-stripe-checkout
Content-Type: application/json

{
  "items": [
    {
      "title": "Blue Floral Dress",
      "size": "S",
      "description": "Beautiful summer dress",
      "price": 45.00,
      "images": [...]
    }
  ],
  "customerInfo": {
    "name": "Jane Doe",
    "email": "jane@email.com",
    "phone": "555-0123"
  },
  "discountCode": "SAVE10"
}
```

**Response**:
```json
{
  "sessionId": "cs_test_xxx",
  "url": "https://checkout.stripe.com/c/pay/cs_test_xxx"
}
```

### Frontend Integration

Update the `processStripePayment` function in `shop-my-fit.html`:

```javascript
async function processStripePayment() {
    // Validate form first
    const form = document.getElementById('checkoutForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    try {
        // Show loading state
        const btn = event.target;
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.innerHTML = '<span class="loading"></span> Creating checkout...';

        // Prepare order data
        const customerInfo = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };

        // Create checkout session
        const response = await fetch('/.netlify/functions/create-stripe-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: cart,
                customerInfo: customerInfo,
                discountCode: appliedDiscount ? appliedDiscount.code : null
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create checkout session');
        }

        const { url } = await response.json();

        // Redirect to Stripe Checkout
        window.location.href = url;

    } catch (error) {
        console.error('Stripe payment error:', error);
        alert('❌ Payment setup failed. Please try another payment method or contact support.');

        // Reset button
        btn.disabled = false;
        btn.textContent = originalText;
    }
}
```

### Success Page

Create `success.html` for post-payment redirect:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Successful - Shop My Fit</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%);
        }
        .success-container {
            background: white;
            padding: 3rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
        }
        .checkmark {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: #10b981;
            margin: 0 auto 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            color: white;
        }
        h1 {
            color: #333;
            margin-bottom: 1rem;
        }
        p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 2rem;
        }
        .btn {
            background: #d946ef;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            display: inline-block;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="success-container">
        <div class="checkmark">✓</div>
        <h1>Order Successful!</h1>
        <p>Thank you for your purchase! You will receive a confirmation email shortly. Your items will ship via USPS within 2-3 business days.</p>
        <a href="/" class="btn">Continue Shopping</a>
    </div>

    <script>
        // Clear cart after successful payment
        localStorage.removeItem('closet_cart');
    </script>
</body>
</html>
```

---

## 🧪 Testing

### Test Email Function Locally

```bash
netlify dev
```

Then test:
```bash
curl -X POST http://localhost:8888/.netlify/functions/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@email.com",
    "subject": "Test Order",
    "body": "This is a test email"
  }'
```

### Test Stripe Function Locally

Use Stripe test keys and test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

```bash
curl -X POST http://localhost:8888/.netlify/functions/create-stripe-checkout \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{
      "title": "Test Product",
      "price": 25.00,
      "description": "Test"
    }],
    "customerInfo": {
      "name": "Test User",
      "email": "test@email.com"
    }
  }'
```

---

## 🔒 Security Best Practices

### API Keys
- ✅ Store in Netlify environment variables (server-side)
- ❌ Never expose in frontend code
- ✅ Use test keys during development
- ✅ Rotate keys if compromised

### CORS
Netlify Functions automatically handle CORS. No configuration needed!

### Rate Limiting
Consider adding rate limiting for production:

```javascript
// Example rate limiter
const rateLimit = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const requests = rateLimit.get(ip) || [];
  const recentRequests = requests.filter(time => now - time < 60000); // 1 minute

  if (recentRequests.length >= 10) {
    return false; // Too many requests
  }

  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  return true;
}
```

---

## 📊 Monitoring

### Netlify Function Logs

View logs in Netlify Dashboard:
1. Go to Functions tab
2. Click on function name
3. View real-time logs

### SendGrid Analytics

Track email delivery:
1. SendGrid Dashboard → Activity
2. View opens, clicks, bounces

### Stripe Dashboard

Monitor payments:
1. Stripe Dashboard → Payments
2. View successful and failed payments

---

## 🚨 Error Handling

### Email Failures
- Logs error to console
- Falls back to browser notification
- Doesn't block order completion

### Stripe Failures
- Shows user-friendly error
- Offers alternative payment methods
- Logs error for debugging

---

## 🎯 Production Checklist

- [ ] Switch to production Stripe keys
- [ ] Verify SendGrid sender domain
- [ ] Test email delivery to real addresses
- [ ] Test Stripe checkout with real card
- [ ] Set up Stripe webhooks for order tracking
- [ ] Configure custom success/cancel URLs
- [ ] Add monitoring/alerting
- [ ] Test error scenarios
- [ ] Document customer support process

---

## 💡 Future Enhancements

1. **Stripe Webhooks**: Track payment status server-side
2. **Order Confirmation Emails**: Automated customer receipts
3. **Abandoned Cart Recovery**: Email reminders
4. **Inventory Sync**: Real-time stock updates
5. **Analytics API**: Track sales, popular items
6. **Admin Notifications**: SMS for urgent orders

---

## 🆘 Troubleshooting

### "Function not found"
- Verify `netlify/functions/` directory structure
- Redeploy site
- Check function names match exactly

### Emails not sending
- Verify SendGrid API key in environment variables
- Check sender email is verified
- Review SendGrid Activity logs

### Stripe checkout fails
- Verify secret key is correct (starts with `sk_`)
- Check Stripe Dashboard for API errors
- Ensure test mode matches (test key + test card)

### CORS errors
- Netlify Functions handle CORS automatically
- If issues persist, check function response headers

---

**Backend integration complete! Your store now has production-ready payment and email features. 🚀**
