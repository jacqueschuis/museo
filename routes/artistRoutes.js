const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utilities/catchasync");
const { isLoggedIn, validateArtist } = require("../utilities/middleware");
const artistController = require("../controllers/artistController");

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});

router
  .route("/")
  .get(catchAsync(artistController.index))
  .patch(catchAsync(artistController.filterArtists))
  .post(isLoggedIn, upload.array('image'), validateArtist, catchAsync(artistController.createNewArtist))

router
  .route('/new')
  .get(isLoggedIn, catchAsync(artistController.renderNewArtistForm))

router.route("/:id").get(catchAsync(artistController.show));

module.exports = router;
