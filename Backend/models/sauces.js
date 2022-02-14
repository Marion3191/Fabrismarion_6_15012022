const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer:  { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  mainPepper: { type: String, required: true },
  userId: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, defaut: 0 },
  dislikes: { type: Number, defaut: 0 },
  usersLiked: { type: [String]},
  usersDisliked: { type: [String]}
});

module.exports = mongoose.model('sauces', saucesSchema);