const express = require('express');
const browserify = require('browserify-middleware');
const path = require('path');
const app = express();

const paths = require('./controller/paths');
const secrets = require('./util/secrets');

const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');

app.set('view engine', 'pug');

const store = new MongoDBStore({
  uri: secrets.mongoURI,
  collection: 'sessions'
});

app.use(session({
  secret: secrets.secret,
  secure: false,
  resave: false,
  saveUninitialized: false,
  store: store
}));

// Middleware that saves the paths in the main directory.
app.use(paths);

// Convert to JS-Browser
app.use('/js', browserify(path.join(__dirname, 'public', 'js')));

// Create a static folder for using in the views.
app.use(express.static('public'))

// Create the basic routes.
app.use(authRoutes);
app.use(shopRoutes);

// Start the server.
mongoose.connect(secrets.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(3000);
})