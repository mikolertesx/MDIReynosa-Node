const express = require('express');
const browserify = require('browserify-middleware');
const path = require('path');

const paths = require('./controller/paths');

const app = express();

const shopRoutes = require('./routes/shop');

app.set('view engine', 'pug');

app.use(paths);

app.use('/js', browserify(path.join(__dirname, 'public', 'js')));

app.use(express.static('public'))

app.use(shopRoutes);

app.listen(3000);