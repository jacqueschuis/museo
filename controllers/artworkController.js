const Museum = require("../models/museum");
const Artwork = require("../models/artwork");
const Artist = require("../models/artist");
// const {cloudinary} = require('../utilities/cloudinary');

module.exports.submitArtwork = async (req, res) => {
  const { id } = req.params;
  let museum = await Museum.findById(id);
  console.log(museum);
  let artist = await Artist.findById(req.body.artwork.artist);
  let artwork = new Artwork(req.body.artwork);
  artwork.postedBy = req.user._id;
  artwork.museum = id;
  let image = {
    url: req.body.image,
    postedBy: req.user._id,
  };
  artwork.images.push(image);
  artist.artworks.push(artwork._id);
  artist.museums.push(id);
  museum.artworks.push(artwork._id);
  museum.save();
  artwork.save();
  artist.save();
  res.redirect(`/museums/${id}`);
};

module.exports.index = async (req, res) => {
  const artworks = await Artwork.find({});
  res.render("artworks/index", { artworks });
};

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const artwork = await Artwork.findById(id)
    .populate("artist")
    .populate("postedBy")
    .populate("museum");
  res.render("artworks/show", { artwork });
};
