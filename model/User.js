const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO Add methods to look for products.
// TODO Add methods to clean up products.
const UserSchema = new Schema({
  name: String,
  password: String,
  role: String
});

module.exports = mongoose.model('User', UserSchema);