const Museum = require("../models/museum");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
// const { cloudinary } = require("../cloudinary");

const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.devHome = (req, res) => {
  res.render("dev/devHome");
};

module.exports.newMuseumForm = (req, res) => {
  res.render("dev/devnewmuseum");
};

module.exports.newDevMuseum = async (req, res, next) => {
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
  const museum = new Museum(req.body.museum);
  museum.geometry = geoData.body.features[0].geometry;
  museum.postedBy = req.user._id;
  museum.images.push(image);
  console.log(museum);
  await museum.save();
  req.flash("success", `${museum.name} added to museo`);
  res.redirect("/admin/newmuseum");
};
