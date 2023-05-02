const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utilities/catchasync");
const { isLoggedIn, isAuthor } = require("../utilities/middleware");
const artworkController = require("../controllers/artworkController");

const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

router
  .route("/")
  .get(catchAsync(artworkController.index))
  .post(isLoggedIn, upload.array('image'), catchAsync(artworkController.createArtwork))
  .patch(catchAsync(artworkController.filterArtwork))

router
  .route('/new')
  .get(isLoggedIn, catchAsync(artworkController.renderNewArtworkForm))

router.get("/:id", catchAsync(artworkController.show));

module.exports = router;
