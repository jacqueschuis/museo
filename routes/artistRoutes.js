const express = require("express");
const router = express.Router({mergeParams: true});
const catchAsync = require("../utilities/catchasync");
const { isLoggedIn, isAuthor } = require("../utilities/middleware");
const artistController = require("../controllers/artistController");

router.route("/").get(catchAsync(artistController.index));

module.exports = router;
