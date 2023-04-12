const mongoose = require("mongoose");

const Review = require("./review");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: String,
  filename: String,
});

imageSchema.virtual("thumbnail").get(() => {
  return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };

const museumSchema = new Schema(
  {
    name: String,
    images: [imageSchema],
    admission: Number,
    summary: String,
    location: String,
    geometry: {
      type: String,
      enum: "Point",
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    artworks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Artwork",
      },
    ],
  },
  opts
);

museumSchema.virtual("properties.popUpMarkUp").get(() => {
  return `
    <b><a href="/museums/${this.id}">${this.name}</a></b>
    <p>${this.summary}</p>
    `;
});

museumSchema.post("findOneAndDelete", async function (museum) {
  if (museum) {
    await Review.deleteMany({
      _id: {
        $in: museum.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Museum", museumSchema);
