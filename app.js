const express = require('express');
const indexRoute = require('./routes/index');

const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'))

app.use(indexRoute);

app.listen(3000);