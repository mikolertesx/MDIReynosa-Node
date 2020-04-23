const express = require('express');
const browserify = require('browserify-middleware');
const path = require('path');
const app = express();

const paths = require('./controller/paths');
const secrets = require('./util/secrets');

const shopRoutes = require('./routes/shop');

const session = require('express-session');

app.set('view engine', 'pug');

app.use(session({
  secret: secrets.secret,
  secure: false,
  resave: false,
  saveUninitialized: false
}));

app.use(paths);

// Convert to JS-Browser
app.use('/js', browserify(path.join(__dirname, 'public', 'js')));

// Create a static folder for using in the views.
app.use(express.static('public'))

// Create the basic routes.
app.use(shopRoutes);

// Start the server.
app.listen(3000);