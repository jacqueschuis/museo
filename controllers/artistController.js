const Artist = require("../models/artist");
const Museum = require("../models/museum");
const Artwork = require("../models/artwork");

module.exports.index = async (req, res) => {
  const museums = await Museum.find({})
  const artists = await Artist.find({});
  res.render("artist/index", { artists, museums });
};

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const artist = await Artist.findById(id)
    .populate("artworks")
    .populate("museums");
  res.render("artist/show", { artist });
};

module.exports.filterArtists = async (req, res) => {
    const museums = await Museum.find({})
    console.log(req.body);
    const {name, filterBornDate, filterDeathDate, filterMuseum} = req.body;
    console.log(name, filterBornDate, filterDeathDate, filterMuseum);
    const artists = await Artist.find({})
    res.render('artist/index', {artists, museums})
}
