// TODO Add a favicon.
// TODO Add employees implementation.
// TODO Add more images so that it looks cool.
const express = require('express');
const browserify = require('browserify-middleware');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();

const navigation = require('./middleware/navigation');
const csrfProtection = require('./middleware/csrf');
const debug = require('./middleware/debug');

const secrets = require('./util/secrets');

const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');

const fs = require('fs');
const dir = __dirname + '/public/img/static'
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/static');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + '-' + file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

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

app.use(flash());

// Convert to JS-Browser
app.use('/js', browserify(path.join(__dirname, 'public', 'js')));

// Create a static folder for using in the views.
app.use(express.static('public'))

// Get the x-www-form-urlencoded info.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));

// Get the multipart-form encoded info.
app.use(multer({
  storage: fileStorage,
  fileFilter: fileFilter
}).single('image'))

// Creates a CSRF req object.
app.use(csrfProtection);

// Middleware that saves the paths in the app locals.
app.use(navigation);

// Give useful debug information.
app.use(debug);

// Create the basic routes.
app.use(authRoutes);
app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
  res.render('error/404');
})

app.use((err, req, res, next) => {
  console.log('Pagina 500', err);
  let message = "";

  switch (err.code) {
    case "EBADCSRFTOKEN":
      message = "Token de seguridad no valido.\nPor favor regresa a la página principal";
      break;
    default:
      message = "Ocurrio un error desconocido.";
      break;
  }

  const errorCode = err.code;
  res.render('error/500', {
    message: message
  });
})

const port = process.env.PORT || 3000;

// Start the server.
mongoose.connect(secrets.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Server succesfully loaded database, web-page will start now.');
    app.listen(port);
  })