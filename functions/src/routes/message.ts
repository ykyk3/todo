const admin = require('firebase-admin');
import * as express from 'express';
const app = express();

admin.initializeApp();

app.get('/', async (req, res) => {
  // grab the text parameter.
  // push the new message into the realtime database using the firebase admin sdk.
  admin.database().ref('/messages').on('value', (snapshot: any) => {
    res.send({test:'test'})
    // res.redirect(200, snapshot.val().json());
  });
});

app.post('/', async (req, res) => {
  const original = req.body.message;
  // push the new message into the realtime database using the firebase admin sdk.
  const snapshot = await admin.database().ref('/messages').push({ original: original });
  // redirect with 303 see other to the url of the pushed object in the firebase console.
  res.redirect(303, snapshot.ref.toString());
});

module.exports = app;