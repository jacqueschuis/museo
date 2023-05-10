const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utilities/catchasync");
const {
  isLoggedIn,
  isAuthor,
  validateArtwork,
} = require("../utilities/middleware");
const artworkController = require("../controllers/artworkController");

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(artworkController.index))
  .patch(catchAsync(artworkController.filterArtwork));

router
  .route("/newByUpload")
  .post(
    isLoggedIn,
    upload.array("image"),
    validateArtwork,
    catchAsync(artworkController.createArtworkByUpload)
  );

router
  .route("/newByUrl")
  .post(
    isLoggedIn,
    validateArtwork,
    catchAsync(artworkController.createArtworkByUrl)
  );

router
  .route("/new")
  .get(isLoggedIn, catchAsync(artworkController.renderNewArtworkForm));

router
  .route("/:id")
  .get(catchAsync(artworkController.show))
  .delete(catchAsync(artworkController.deleteArtwork));

module.exports = router;
