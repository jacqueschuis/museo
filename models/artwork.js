const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: String,
  filename: String,
});

imageSchema.virtual("thumbnail").get(() => {
  return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };

const artworkSchema = new Schema({
  title: String,
  artist: String,
  year: Number,
  museum: {
    type: Schema.Types.ObjectId,
    ref: "Museum",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Artwork", artworkSchema);
