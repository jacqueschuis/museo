const Museum = require("../models/museum");
// const Artwork = require("../models/artwork");
// const Review = require("../models/review");
const ExpressError = require("../utilities/expresserror");
const { artistSchema, artworkSchema } = require("../utilities/schemas");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.sessionreturnTo = req.originalUrl;
    req.flash("error", "you must be signed in");
    return res.redirect("/login");
  }
  next();
};

module.exports.isMuseumAuthor = async (req, res, next) => {
  const { id } = req.params;
  const museum = await Museum.findById(id);
  if (!museum.postedBy.equals(req.user._id) && !req.user.isAdmin) {
    req.flash("error", "you do not have permission to do that");
    return res.redirect("/login");
  }
  next();
};

module.exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.isAdmin !== true) {
    req.flash("error", "you are not an admin");
    return res.redirect("/login");
  }
  next();
};

module.exports.validateArtist = (req, res, next) => {
  const {error} = artistSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

module.exports.validateArtwork = (req, res, next) => {
  const {error} = artworkSchema.validate(req.body.artist);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}