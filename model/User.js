const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  password: String,
  products: []
});

module.exports = mongoose.model('User', UserSchema);