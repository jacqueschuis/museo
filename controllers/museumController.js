const Museum = require("../models/museum");
const Artist = require("../models/artist");
const Artwork = require("../models/artwork");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
// const { cloudinary } = require("../cloudinary");

const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.index = async (req, res) => {
  const museums = await Museum.find({});
  const artists = await Artist.find({});
  const allMuseums = museums;
  res.render("museums/index", { museums, artists, allMuseums });
};

module.exports.showMuseum = async (req, res) => {
  const { id } = req.params;
  const formArtists = await Artist.find({});
  const artists = await Artist.find().where("museums").all([id]);
  const museum = await Museum.findById(id)
    .populate("postedBy")
    .populate("artworks");
  res.render("museums/show", { museum, formArtists, artists });
};

module.exports.filterMuseums = async (req, res) => {
  const artists = await Artist.find({});
  const { name } = req.body;
  const allMuseums = await Museum.find({});
  if (name) {
    const museumAgg = [
      {
        $search: {
          index: "default",
          autocomplete: {
            query: name,
            path: "name",
            fuzzy: {
              maxEdits: 2,
            },
          },
        },
      },
    ];
    const museums = await Museum.aggregate(museumAgg);
    return res.render("museums/index", { museums, artists, allMuseums });
  }
  const museums = await Museum.find({});
  res.render("museums/index", { museums, artists, allMuseums });
};

module.exports.newByUpload = async (req, res) => {
  const { museum } = req.body;
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.museum.location,
      limit: 1,
    })
    .send();
  const image = {
    url: req.body.image,
    postedBy: req.user._id,
  };
  const newMuseum = new Museum(museum);
  newMuseum.geometry = geoData.body.features[0].geometry;
  newMuseum.postedBy = req.user._id;
  newMuseum.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  await newMuseum.save();
  req.flash("success", `${newMuseum.name} added to museo`);
  res.redirect(`/museums/${newMuseum._id}`);
};

module.exports.newByUrl = async (req, res) => {
  const { museum } = req.body;
  console.log(museum);
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.museum.location,
      limit: 1,
    })
    .send();
  const image = {
    url: req.body.imageUrl,
    postedBy: req.user._id,
  };
  const newMuseum = new Museum(museum);
  newMuseum.geometry = geoData.body.features[0].geometry;
  newMuseum.postedBy = req.user._id;
  newMuseum.images.push(image);
  await newMuseum.save();
  req.flash("success", `${newMuseum.name} added to museo`);
  res.redirect(`/museums/${newMuseum._id}`);
};

module.exports.renderNewForm = async (req, res) => {
  const museums = await Museum.find({});
  let names = [];
  for (let museum of museums) {
    names.push({
      name: museum.name,
      id: museum._id,
    });
  }
  res.render("museums/new", { names });
};

module.exports.deleteMuseum = async (req, res) => {
  const {id} = req.params;
  const museum = await Museum.findById(id);
  await Museum.findByIdAndDelete(id);
  await Artist.updateMany({museums: id}, {$pull: {museums: id}});
  await Artwork.deleteMany({museum: id});
  req.flash("success", `${museum.name} removed from museo`);
  res.redirect('/museums');
}
