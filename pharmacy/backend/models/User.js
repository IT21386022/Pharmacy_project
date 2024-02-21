const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Owner', 'Manager', 'Cashier'], required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
