const User = require("../models/user");
const Artwork = require('../models/artwork');
const Artist = require('../models/artist');
const Museum = require('../models/museum');

module.exports.registerForm = (req, res) => {
  res.render("user/register");
};

module.exports.registerUser = async (req, res, next) => {
  try {
    const { email, username, password, firstName, lastName } = req.body;
    const isAdmin = false;
    const user = new User({ email, username, firstName, lastName, isAdmin });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "welcome to museo");
      res.redirect("/");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.loginForm = (req, res) => {
  res.render("user/login");
};

module.exports.loginUser = async (req, res) => {
  req.flash("success", `welcome back, ${req.user.firstName}`);
  const redirectUrl = req.session.returnTo || "/";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  const redirectUrl = req.session.returnTo || "/";
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you have been signed out");
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  });
};

module.exports.show = async (req, res) => {
  const {id} = req.params;
  const user = await User.findById(id);
  const artworks = await Artwork.find({postedBy: id});
  const museums = await Museum.find({postedBy: id});
  const artists = await Artist.find({postedBy: id});
  
  res.render('user/show', {user, artworks, artists, museums});

}