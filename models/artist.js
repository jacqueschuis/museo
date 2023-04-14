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

const artistSchema = new Schema({
  name: String,
  artworks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
  images: [imageSchema],
  year: Number,
  museum: {
    type: Schema.Types.ObjectId,
    ref: "Museum",
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  opts,
});

module.exports = mongoose.model("Artist", artistSchema);
