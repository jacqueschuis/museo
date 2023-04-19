const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utilities/catchasync");
const { isLoggedIn, isAuthor } = require("../utilities/middleware");
const artworkController = require("../controllers/artworkController");

router.get("/", catchAsync(artworkController.index));

router.get("/:id", catchAsync(artworkController.show));

module.exports = router;
