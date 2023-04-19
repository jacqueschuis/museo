const Museum = require("../models/museum");
const Artist = require('../models/artist');
const Artwork = require('../models/artwork');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
// const { cloudinary } = require("../cloudinary");

const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.index = async (req, res) => {
  const museums = await Museum.find({});
  res.render("museums/index", { museums });
};

module.exports.showMuseum = async(req,res) => {
  const {id} = req.params;
  const artists = await Artist.find({});
  const museum = await Museum.findById(id).populate('postedBy')
  const artworks = await Artwork.find({museum: id});
  console.log(artworks);
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
  res.render('museums/show', {museum, artists, artworks})
}