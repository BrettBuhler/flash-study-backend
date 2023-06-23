const express = require("express");
const route = express();
// This is your test secret API key.
require('dotenv').config()
const stripeSecret = process.env.STRIPE_SECRET
const stripe = require("stripe")(stripeSecret);

route.use(express.static("public"));


const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 500;
};

route.post("/create-payment-intent", async (req, res) => {
  const { items, user_id } = req.body;
  console.log(user_id)
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "cad",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      "user_id": user_id,
    }
  });
  console.log(paymentIntent.client_secret)
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

//const endpointSecret = "whsec_v1NGBOh701eidU0nvdjnkfWAg0N3bi76";

/*
route.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  console.log('im here')
  const sig = request.headers['stripe-signature'];


  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error1: ${err.message}, Sig: ${sig}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeded':
      console.log('IN STRIPE MAIN ROUTE WEBHOOK (succeded)')
      break;
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      console.log('IN STRIPE MAIN ROUTE WEBHOOK')
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});
*/


const endpointSecret = "whsec_3GLcqOgKDEZh76j6Tbrvi9faEt3cCtMS";


module.exports = route