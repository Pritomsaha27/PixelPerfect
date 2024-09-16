const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  auth0Id: { type: String, required: true, unique: true },
  likedPhotos: [String]
});
const User = mongoose.model('User', userSchema);

module.exports = User;
