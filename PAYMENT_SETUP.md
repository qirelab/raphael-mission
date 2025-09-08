# Payment System Integration Guide

This document provides setup instructions for the three integrated payment systems: Stripe, PayPal, and Fondy.

## Overview

The donation system now supports three payment methods:
- **Stripe**: Modern UI, supports multiple currencies worldwide
- **PayPal**: Trusted brand, simple setup, widely recognized  
- **Fondy**: Perfect for Poland, Ukraine, Eastern Europe

## Quick Start

1. **Install Dependencies** (already done):
   ```bash
   npm install @stripe/stripe-js @stripe/react-stripe-js @paypal/react-paypal-js
   ```

2. **Configure API Keys** (see sections below)

3. **Test Integration**:
   ```bash
   node src/test-payment-integration.js
   ```

## Stripe Setup

### 1. Get Stripe Keys
1. Create account at [stripe.com](https://stripe.com)
2. Get your publishable key from the dashboard
3. Replace in `src/components/payment/StripePayment.jsx`:
   ```javascript
   const stripePromise = loadStripe('pk_live_your_actual_stripe_key_here');
   ```

### 2. Backend Integration
Create an endpoint to handle payment intents:
```javascript
// Example backend endpoint
app.post('/api/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Stripe uses cents
    currency: currency,
    metadata: { type: 'donation' }
  });
  
  res.send({ client_secret: paymentIntent.client_secret });
});
```

### 3. Environment Variables
```env
STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
STRIPE_SECRET_KEY=sk_live_your_secret_key_here
```

## PayPal Setup

### 1. Get PayPal Client ID
1. Create account at [developer.paypal.com](https://developer.paypal.com)
2. Create an application
3. Replace in `src/components/payment/PayPalPayment.jsx`:
   ```javascript
   const initialOptions = {
     'client-id': 'your_actual_paypal_client_id_here',
     currency: currency,
     intent: 'capture',
   };
   ```

### 2. Environment Variables
```env
PAYPAL_CLIENT_ID=your_client_id_here
PAYPAL_CLIENT_SECRET=your_client_secret_here
```

### 3. Webhook Setup
Set up webhooks in PayPal dashboard to handle payment confirmations.

## Fondy Setup

### 1. Get Fondy Merchant ID
1. Create account at [fondy.eu](https://fondy.eu)
2. Get your merchant ID
3. Replace in `src/components/payment/FondyPayment.jsx`:
   ```javascript
   merchant_id: 'your_actual_fondy_merchant_id_here',
   ```

### 2. Backend Integration
Fondy requires server-side signature generation:
```javascript
// Example backend endpoint
app.post('/api/fondy/create-checkout', async (req, res) => {
  const { amount, order_id, order_desc } = req.body;
  
  const fondyData = {
    merchant_id: process.env.FONDY_MERCHANT_ID,
    order_id: order_id,
    order_desc: order_desc,
    amount: amount * 100, // Fondy uses cents
    currency: 'USD'
  };
  
  // Generate signature (implement according to Fondy docs)
  fondyData.signature = generateFondySignature(fondyData);
  
  res.json({ checkout_url: 'https://pay.fondy.eu/merchants/...' });
});
```

### 3. Environment Variables
```env
FONDY_MERCHANT_ID=your_merchant_id_here
FONDY_SECRET_KEY=your_secret_key_here
```

## Security Considerations

### 1. API Keys
- Never expose secret keys in frontend code
- Use environment variables for all sensitive data
- Use different keys for development and production

### 2. Validation
- Always validate payments on the server side
- Verify webhook signatures
- Check payment amounts match expected values

### 3. Error Handling
- Implement proper error logging
- Show user-friendly error messages
- Have fallback payment methods

## Testing

### 1. Test Cards (Stripe)
- Success: `4242424242424242`
- Decline: `4000000000000002`
- 3D Secure: `4000002500003155`

### 2. PayPal Sandbox
- Use sandbox accounts for testing
- Test different payment scenarios

### 3. Fondy Test Environment
- Use test merchant credentials
- Test with different card types

## Production Deployment

### 1. Environment Setup
```env
NODE_ENV=production
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
PAYPAL_CLIENT_ID=live_client_id
FONDY_MERCHANT_ID=live_merchant_id
```

### 2. SSL Certificate
- Ensure HTTPS is enabled
- Payment providers require secure connections

### 3. Compliance
- Implement PCI DSS compliance measures
- Set up proper logging and monitoring
- Configure webhook endpoints

## Customization

### 1. Currency Support
Update currency options in `PaymentSelector.jsx`:
```javascript
const currencies = ['USD', 'EUR', 'PLN', 'UAH'];
```

### 2. Styling
Customize payment forms in individual component files:
- `StripePayment.jsx` - Stripe Elements styling
- `PayPalPayment.jsx` - PayPal button styling  
- `FondyPayment.jsx` - Custom form styling

### 3. Languages
Add multi-language support:
```javascript
// In FondyPayment.jsx
lang: locale === 'pl' ? 'pl' : 'en'
```

## Troubleshooting

### Common Issues
1. **CORS Errors**: Configure backend CORS settings
2. **Webhook Failures**: Check endpoint URLs and signatures
3. **Payment Failures**: Verify API keys and test data

### Debug Mode
Enable debug logging in development:
```javascript
console.log('Payment data:', paymentData);
```

## Support

- **Stripe**: [stripe.com/docs](https://stripe.com/docs)
- **PayPal**: [developer.paypal.com](https://developer.paypal.com)
- **Fondy**: [docs.fondy.eu](https://docs.fondy.eu)

## Next Steps

1. Replace all placeholder API keys with real credentials
2. Set up backend endpoints for payment processing
3. Configure webhooks for payment confirmations
4. Test thoroughly in sandbox/test environments
5. Deploy to production with proper security measures