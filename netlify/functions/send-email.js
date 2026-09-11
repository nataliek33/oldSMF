// Netlify Function: Send Email Notification
// This function sends order confirmation emails using SendGrid

const sendgrid = require('@sendgrid/mail');

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { to, subject, body, orderId } = JSON.parse(event.body);

    // Validate input
    if (!to || !subject || !body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Initialize SendGrid with API key from environment variable
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      throw new Error('SendGrid API key not configured');
    }

    sendgrid.setApiKey(apiKey);

    // Send email
    const msg = {
      to: to,
      from: process.env.FROM_EMAIL || 'noreply@shopmyfit.com',
      subject: subject,
      text: body,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d946ef 0%, #c026d3 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #eee; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 0.875rem; color: #666; border-radius: 0 0 10px 10px; }
            .button { background: #d946ef; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0; }
            pre { background: #f9fafb; padding: 15px; border-radius: 8px; overflow-x: auto; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Shop My Fit</h1>
              <p style="margin: 10px 0 0 0;">You just stepped into my closet. Welcome 🖤</p>
            </div>
            <div class="content">
              ${body.split('\n').map(line => `<p>${line}</p>`).join('')}
              ${orderId ? `<p style="margin-top: 30px;"><strong>Order ID:</strong> ${orderId}</p>` : ''}
            </div>
            <div class="footer">
              <p>© 2026 Shop My Fit. All rights reserved.</p>
              <p style="margin-top: 10px;">Questions? Reply to this email!</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await sendgrid.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully'
      })
    };

  } catch (error) {
    console.error('Email send error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send email',
        details: error.message
      })
    };
  }
};
