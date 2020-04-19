const express = require('express');
const indexRoute = require('./routes/index');
const browserify = require('browserify-middleware');
const path = require('path');

const app = express();

app.set('view engine', 'pug');

// Create a browser version of javascript files.
app.use('/js', browserify(path.join(__dirname, 'public', 'js')));

app.use(express.static('public'))

app.use(indexRoute);

app.listen(3000);