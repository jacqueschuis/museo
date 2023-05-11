const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utilities/catchasync");
const {
  isLoggedIn,
  isMuseumAuthor,
  validateMuseum,
} = require("../utilities/middleware");
const museumController = require("../controllers/museumController");

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(museumController.index))
  .patch(catchAsync(museumController.filterMuseums));

router
  .route("/newByUrl")
  .post(isLoggedIn, validateMuseum, catchAsync(museumController.newByUrl));

router
  .route("/newByUpload")
  .post(
    isLoggedIn,
    upload.array("image"),
    validateMuseum,
    catchAsync(museumController.newByUpload)
  );

router.route("/new").get(catchAsync(museumController.renderNewForm));

router
  .route("/:id")
  .get(catchAsync(museumController.showMuseum))
  .delete(
    isLoggedIn,
    isMuseumAuthor,
    catchAsync(museumController.deleteMuseum)
  );

router
  .route("/:id/edit")
  .get(isLoggedIn, isMuseumAuthor, catchAsync(museumController.editMuseumForm));
module.exports = router;
