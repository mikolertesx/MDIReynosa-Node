const express = require('express');
const browserify = require('browserify-middleware');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const paths = require('./controller/paths');
const secrets = require('./util/secrets');

const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

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
  store: store,
  cookie: {
    // 1 Week time to re-enter.
    expires: 1000 * 60 * 24 * 7
  }
}));

// Convert to JS-Browser
app.use('/js', browserify(path.join(__dirname, 'public', 'js')));

// Create a static folder for using in the views.
app.use(express.static('public'))

// Get the x-www-form-urlencoded info.
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware that saves the paths in the main directory.
app.use(paths);

// Create the basic routes.
app.use(authRoutes);
app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
  res.render('error/404');
})

app.use((err, req, res, next) => {
  console.log('Pagina 500', err);
  res.render('error/500');
})

// Start the server.
const UserSchema = require('./model/User');

mongoose.connect(secrets.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Server succesfully loaded database, web-page will start now.');
  app.listen(3000);
})