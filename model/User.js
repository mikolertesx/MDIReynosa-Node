const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO Add methods to look for products.
// TODO Add methods to clean up products.
// TODO Create a products model.
const UserSchema = new Schema({
  name: String,
  password: String,
  products: [],
  role: String
});

module.exports = mongoose.model('User', UserSchema);