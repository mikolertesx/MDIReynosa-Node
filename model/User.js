const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO Add methods to look for products.
// TODO Add methods to clean up products.
// TODO Create a products model.
// TODO Create a role section.
const UserSchema = new Schema({
  name: String,
  password: String,
  products: []
});

module.exports = mongoose.model('User', UserSchema);