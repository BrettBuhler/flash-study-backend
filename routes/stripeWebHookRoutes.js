/**NOTE
 * Do not merge stripe web hook routes into stripe routes.
 * Stripe's webhook api will break when using a body parser and the rest of the stripe routes require a body parser.
 * webhook routes are used in index.js BEFORE body parser is used and the remaining stripe routes are used AFTER
 */

const axios = require('axios')
const stripeSecret = process.env.STRIPE_SECRET
const stripe = require('stripe')(stripeSecret);
const express = require('express');
const route = express();


const endpointSecret = "whsec_3GLcqOgKDEZh76j6Tbrvi9faEt3cCtMS";

route.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      //const paymentIntentSucceeded = event.data.object;
      console.log('event.data.object.metadata.user_id', event.data.object.metadata.user_id)
      const _id = event.data.object.metadata.user_id
      try {
        const axiosResponse = await axios.post('https://flash-study.uc.r.appspot.com/api/addtokens', {"_id": _id, "number": 100000})
        if (axiosResponse.data.user){
            console.log('100K added to', axiosResponse.data.user._id)
        }
      } catch (err) {
        response.status(500).send(`Internal Server Error: ${err}, Eventdatametadatauserid: ${event.data.object.metadata.user_id}`)
        return;
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.status(200).send('message: tokens added');
});

module.exports = route