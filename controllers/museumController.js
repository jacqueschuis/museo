const Museum = require("../models/museum");
const Artist = require('../models/artist');
const Artwork = require('../models/artwork');
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

module.exports.showMuseum = async(req,res) => {
  const {id} = req.params;
  const formArtists = await Artist.find({});
  const artists = await Artist.find().where('museums').all([id]);
  const museum = await Museum.findById(id).populate('postedBy')
  const artworks = await Artwork.find({museum: id}).populate('artist');
  // .populate({
  //   path: 'reviews',
  //   populate: {
  //     path: 'postedBy'
  //   }
  // }).populate({
  //   path: 'artworks',
  //   populate: {
  //     path: 'postedBy'
  //   }
  // }).populate('postedBy');
  // if (!museum) {
  //   req.flash('error', 'museum not found');
  //   return res.redirect('/museums');
  // }
  res.render('museums/show', {museum,formArtists, artists, artworks})
}

module.exports.filterMuseums = async(req,res) => {
  const artists = await Artist.find({});
  const {name} = req.body;
  const allMuseums = await Museum.find({})
  if (name) {
    const museumAgg = [
      {
        $search: {
          index: "default",
          autocomplete: {
            query: name,
            path: "name",
            fuzzy: {
              maxEdits: 1,
            },
          },
        },
      },
    ];
    const museums = await Museum.aggregate(museumAgg);
    return res.render('museums/index', {museums, artists, allMuseums});
  } 
  const museums = await Museum.find({});
  res.render('museums/index', {museums,artists, allMuseums});
}

module.exports.renderNewForm = async (req, res) => {
  const museums = await Museum.find({});
  let museumNames = [];
    for (let museum of museums) {
        museumNames.push(museum.name);
    }
  res.render('museums/new',{museumNames})
}