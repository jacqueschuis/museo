const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: String,
  filename: String,
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

imageSchema.virtual("thumbnail").get(() => {
  return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };

const museumSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    images: [imageSchema],
    summary: String,
    location: String,
    url: String,
    timePeriodFocus: {
      type: String,
      enum: [
        "prehistoric",
        "ancient",
        "medieval",
        "renaissance",
        "early modern",
        "modern",
        "contemporary",
        "noTimeFocus",
      ],
    },
    mediaFocus: {
      type: String,
      enum: ["noMediaFocus", "2d", "3d", "performance", "video"],
    },
    geoFocus: {
      type: String,
      enum: [
        "african",
        "american",
        "east asian",
        "european",
        "islamic",
        "native american",
        "oceania",
        "south asian",
        "noGeoFocus",
      ],
    },
    isEncyclopedic: {
      type: Boolean,
    },
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
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

module.exports = mongoose.model("Museum", museumSchema);
