const express = require("express");
const router = express.Router({mergeParams: true});
const catchAsync = require("../utilities/catchasync");
const { isLoggedIn, isAuthor } = require("../utilities/middleware");
const artworkController = require("../controllers/artworkController");

router.post('/', catchAsync(artworkController.submitArtwork));

module.exports = router