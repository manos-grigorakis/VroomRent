const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

exports.handleStripeWebhook = (request, response) => {
  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed:`, err.message);
    return response.sendStatus(400);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent was successful: ${paymentIntent.id}`);
      break;
    case "payment_intent.payment_failed":
      const paymentIntentFailed = event.data.object;
      console.log(`PaymentIntent failed: ${paymentIntentFailed.id}`);
      break;
    case "payment_intent.canceled":
      const paymentIntentCanceled = event.data.object;
      console.log(`PaymentIntent was canceled: ${paymentIntentCanceled.id}`);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true });
};
