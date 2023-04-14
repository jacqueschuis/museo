const Museum = require("../models/museum");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
// const { cloudinary } = require("../cloudinary");

const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.index = async (req, res) => {
  const museums = await Museum.find({});
  res.render("museums/index", { museums });
};
