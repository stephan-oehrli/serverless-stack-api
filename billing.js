import stripePackage from 'stripe';
import handler from './libs/handler-lib';
import { calculateCost } from './libs/billing-lib';

export const main = handler(async (event, context) => {
  // We get the storage and source from the request body.
  // The storage variable is the number of notes the user would like to store in his account.
  // And source is the Stripe token for the card that we are going to charge.
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = 'Scratch charge';

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  await stripe.charges.create({ source, amount, description, currency: 'usd' });
  return { status: true };
});
