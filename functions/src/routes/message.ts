const admin = require('firebase-admin');
import * as express from 'express';
const app = express();

admin.initializeApp();

app.get('/', async (req, res) => {
  admin.database().ref('/messages').on('value', (data: any) => {
    res.status(200).send(data);
  })
});

app.get('/:id', async (req, res) => {
  const id: string = req.params.id;
  admin.database().ref(`/messages/${id}`).on('value', (data: any) => {
    res.status(200).send(data);
  })
});

app.post('/', async (req, res) => {
  const original = req.body.message;
  // push the new message into the realtime database using the firebase admin sdk.
  const snapshot = await admin.database().ref('/messages').push({ original: original });
  // redirect with 303 see other to the url of the pushed object in the firebase console.
  res.redirect(303, snapshot.ref.toString());
});

app.put('/', async (req, res) => {
  const original = req.body.message;
  // push the new message into the realtime database using the firebase admin sdk.
  const snapshot = await admin.database().ref('/messages').push({ original: original });
  // redirect with 303 see other to the url of the pushed object in the firebase console.
  res.redirect(303, snapshot.ref.toString());
});

app.delete('/', async (req, res) => {
  const original = req.body.message;
  // push the new message into the realtime database using the firebase admin sdk.
  const snapshot = await admin.database().ref('/messages').push({ original: original });
  // redirect with 303 see other to the url of the pushed object in the firebase console.
  res.redirect(303, snapshot.ref.toString());
});

module.exports = app;