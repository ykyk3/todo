// setup firebase
import * as functions from 'firebase-functions';

// setup express
import * as express from 'express';
const app = express();

// setup routes
const messageRoute = require('./routes/message');
app.use('/messages', messageRoute);

exports.api = functions.https.onRequest(app);