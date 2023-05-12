const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utilities/catchasync");
const {
  isLoggedIn,
  validateArtwork,
  isArtworkAuthor,
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
  .put(
    isLoggedIn,
    isArtworkAuthor,
    validateArtwork,
    catchAsync(artworkController.submitEdit)
  )
  .delete(
    isLoggedIn,
    isArtworkAuthor,
    catchAsync(artworkController.deleteArtwork)
  );

router
  .route("/:id/edit")
  .get(
    isLoggedIn,
    isArtworkAuthor,
    catchAsync(artworkController.editArtworkForm)
  );

module.exports = router;
