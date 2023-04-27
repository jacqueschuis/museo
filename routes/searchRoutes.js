const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utilities/catchasync");
const { isLoggedIn, isAuthor } = require("../utilities/middleware");
const appController = require("../controllers/appControler");

router.route("/").patch(catchAsync(appController.searchMuseo));

module.exports = router;
