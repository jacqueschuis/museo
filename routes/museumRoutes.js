const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utilities/catchasync");
const { isLoggedIn, isAuthor } = require("../utilities/middleware");
const museumController = require("../controllers/museumController");

router
  .route("/")
  .get(catchAsync(museumController.index))
  .patch(catchAsync(museumController.filterMuseums));

router.route("/:id").get(catchAsync(museumController.showMuseum));

module.exports = router;
