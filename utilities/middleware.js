// const Museum = require("../models/museum");
// const Artwork = require("../models/artwork");
// const Review = require("../models/review");
// const ExpressError = require("./expresserror");
// const { museumSchema, reviewSchema, artworkSchema } = require("./schemas");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.sessionreturnTo = req.originalUrl;
    req.flash("error", "you must be signed in");
    return res.redirect("/login");
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
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
