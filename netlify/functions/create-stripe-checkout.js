// Netlify Function: Create Stripe Checkout Session
// Securely creates a Stripe checkout session server-side

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { items, customerInfo, discountCode } = JSON.parse(event.body);

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid items' })
      };
    }

    if (!customerInfo || !customerInfo.email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Customer email required' })
      };
    }

    // Create line items for Stripe
    const line_items = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          description: `${item.size ? `Size: ${item.size} - ` : ''}${item.description.substring(0, 100)}`,
          images: item.images && item.images[0] && item.images[0].data
            ? [item.images[0].data]
            : []
        },
        unit_amount: Math.round(item.price * 100) // Convert to cents
      },
      quantity: 1
    }));

    // Session configuration
    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `${event.headers.origin || 'https://shopmyfit.com'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${event.headers.origin || 'https://shopmyfit.com'}/checkout`,
      customer_email: customerInfo.email,
      shipping_address_collection: {
        allowed_countries: ['US']
      },
      metadata: {
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        discount_code: discountCode || 'none'
      }
    };

    // Apply discount if provided
    if (discountCode) {
      // In production, you would validate the discount code here
      // For now, we'll let the frontend handle validation
      sessionConfig.allow_promotion_codes = true;
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create(sessionConfig);

    return {
      statusCode: 200,
      body: JSON.stringify({
        sessionId: session.id,
        url: session.url
      })
    };

  } catch (error) {
    console.error('Stripe checkout error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to create checkout session',
        details: error.message
      })
    };
  }
};
