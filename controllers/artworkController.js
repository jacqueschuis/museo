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
  const museums = await Museum.find({});
  const allArtworks = artworks;
  res.render("artworks/index", { artworks, museums, allArtworks });
};

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const artwork = await Artwork.findById(id)
    .populate("artist")
    .populate("postedBy")
    .populate("museum");
  res.render("artworks/show", { artwork });
};

module.exports.filterArtwork = async (req, res) => {
  const museums = await Museum.find({});
  const { title, filterFromDate, filterToDate, filterMuseum } = req.body;
  const allArtworks = await Artwork.find({});
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
    return res.render("artworks/index", { artworks, museums, allArtworks });
  }
  if (filterFromDate && filterToDate) {
    const artworks = await Artwork.find()
      .where("year")
      .gte(filterFromDate)
      .lte(filterToDate);
    return res.render("artworks/index", { artworks, museums, allArtworks });
  }
  if (filterFromDate) {
    const artworks = await Artwork.find().where("year").gte(filterFromDate);
    return res.render("artworks/index", { artworks, museums, allArtworks });
  }
  if (filterToDate) {
    const artworks = await Artwork.find().where("year").lte(filterToDate);
    return res.render("artworks/index", { artworks, museums, allArtworks });
  }
  if (filterMuseum) {
    const artworks = await Artwork.find().where("museum").all([filterMuseum]);
    return res.render("artworks/index", { artworks, museums, allArtworks });
  }

  const artworks = await Artwork.find({});
  res.render("artworks/index", { artworks, museums, allArtworks });
};

module.exports.renderNewArtworkForm = async (req, res) => {
  let museumNames = [];
  let artistNames = [];
  const museums = await Museum.find({});
  const artists = await Artist.find({});
  for (let museum of museums) {
    museumNames.push(museum.name);
  }
  for (let artist of artists) {
    artistNames.push(artist.name);
  }
  res.render("artworks/new", { museumNames, artistNames });
};

module.exports.createArtworkByUpload = async (req, res) => {
  const { artwork, artistName, museumName } = req.body;
  const artist = await Artist.findOne({ name: artistName });
  const museum = await Museum.findOne({ name: museumName });
  const newArtwork = new Artwork({
    title: artwork.title,
    year: artwork.year,
    museum: museum._id,
    artist: artist._id,
    postedBy: req.user._id,
  });
  newArtwork.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  await newArtwork.save();
  artist.artworks.push(newArtwork);
  museum.artworks.push(newArtwork);

  // checking to see if artist already has museum
  const hasMuseum = async (artist, museum) => {
    const check = await Artist.find({
      $and: [{ name: artist.name }, { museums: { $all: museum._id } }],
    });
    if (check.length > 0) {
      console.log("museum present already, no push");
      return await artist.save();
    }
    console.log("museum not found, pushing");
    artist.museums.push(museum);
    return await artist.save();
  };
  hasMuseum(artist, museum);

  await museum.save();
  req.flash("success", `${newArtwork.title} added to museo`);
  res.redirect(`/artworks/${newArtwork._id}`);
};

module.exports.createArtworkByUrl = async (req, res) => {
  const image = {
    url: req.body.imageUrl,
    postedBy: req.user._id,
  };
  const { artwork, artistName, museumName } = req.body;
  const artist = await Artist.findOne({ name: artistName });
  const museum = await Museum.findOne({ name: museumName });
  const newArtwork = new Artwork({
    title: artwork.title,
    year: artwork.year,
    museum: museum._id,
    artist: artist._id,
    postedBy: req.user._id,
  });

  newArtwork.images.push(image);
  await newArtwork.save();
  artist.artworks.push(newArtwork);
  museum.artworks.push(newArtwork);

  const hasMuseum = async (artist, museum) => {
    const check = await Artist.find({
      $and: [{ name: artist.name }, { museums: { $all: museum._id } }],
    });
    if (check.length > 0) {
      console.log("museum present already, no push");
      return await artist.save();
    }
    console.log("museum not found, pushing");
    artist.museums.push(museum);
    return await artist.save();
  };
  hasMuseum(artist, museum);

  await museum.save();
  req.flash("success", `${newArtwork.title} added to museo`);
  res.redirect(`/artworks/${newArtwork._id}`);
};

module.exports.deleteArtwork = async (req, res, next) => {
  const { id } = req.params;
  const artwork = await Artwork.findById(id);
  const museumId = artwork.museum;
  const artistId = artwork.artist;
  await Museum.findOneAndUpdate(
    { _id: artwork.museum },
    { $pull: { artworks: id } }
  );
  await Artist.findOneAndUpdate(
    { _id: artwork.artist },
    { $pull: { artworks: id } }
  );
  await Artwork.findByIdAndDelete(id);

  const isLastArtworkFromMuseum = async(museumId, artistId) => {
    const artist = await Artist.findById(artistId).populate('artworks');
    let check = []; 
    for (let artwork of artist.artworks) {
      if (artwork.museum === museumId) {
        check.push(artwork);
      } return
    }
    if (check.length > 1) {
      console.log('not the last one');
     return
    } else {
      console.log('last in museum');
      await Artist.findOneAndUpdate(
        {_id: artistId},
        {$pull: {museums: museumId}}
      )
    }
  };

  isLastArtworkFromMuseum(museumId, artistId)

  req.flash("success", `deleted ${artwork.title} from museo`);
  res.redirect("/artworks");
};
