const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.test);
const cors = require('cors')({origin: true});  // Necesitas instalar el paquete 'cors'
admin.initializeApp();

exports.createPaymentIntent = functions.region('europe-west1').https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { amount, currency } = request.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });

      response.json({ client_secret: paymentIntent.client_secret });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  });
});
