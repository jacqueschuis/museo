const mongoose =require('mongoose');
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
const atlasUrl = process.env.ATLAS_URL;
mongoose.set("strictQuery", true);
mongoose.connect(atlasUrl);
const Artist = require('../../models/artist');
const artistList = require('./artists')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("db connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    for (let artist of artistList) {
        const newArtist = new Artist(artist)
        await newArtist.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})