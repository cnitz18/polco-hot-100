const mongoose = require("mongoose");
const { Schema } = mongoose;
// Create Schema
const FavoritesSchema = new Schema({
  rank: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  isFavorite: {
    type: Boolean,
    required: true
  }
});
module.exports = Favorites = mongoose.model("favorites", FavoritesSchema);