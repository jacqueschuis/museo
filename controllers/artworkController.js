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
  const museums = await Museum.find({})
  res.render("artworks/index", { artworks, museums });
};

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const artwork = await Artwork.findById(id)
    .populate("artist")
    .populate("postedBy")
    .populate("museum");
  res.render("artworks/show", { artwork });
};

module.exports.filterArtwork = async (req,res) => {
  const museums = await Museum.find({})
  const {title, filterFromDate, filterToDate, filterMuseum} = req.body;
  if (title) {
    const artworkAgg = [
      {
        $search: {
          index: "artwork-name",
          autocomplete: {
            query: title,
            path: "title",
            fuzzy: {
              maxEdits: 1,
            },
          },
        },
      },
    ];
    const artworks = await Artwork.aggregate(artworkAgg);
    return res.render('artworks/index', {artworks, museums})

  } if (filterFromDate && filterToDate) {
    const artworks = await Artwork.find()
      .where('year').gte(filterFromDate).lte(filterToDate)
    return res.render('artworks/index', {artworks, museums})
  } if (filterFromDate) {
    const artworks = await Artwork.find()
      .where('year').gte(filterFromDate);
    return res.render('artworks/index', {artworks, museums})
  } if (filterToDate) {
    const artworks = await Artwork.find()
      .where('year').lte(filterToDate);
    return res.render('artworks/index', {artworks, museums})
  } if (filterMuseum) {
    const artworks = await Artwork.find()
      .where('museum').all([filterMuseum])
    return res.render('artworks/index', {artworks, museums})
  }

  const artworks = await Artwork.find({});
  res.render('artworks/index', {artworks, museums});
}