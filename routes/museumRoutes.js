const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchasync");
const { isLoggedIn, isAuthor } = require("../utilities/middleware");
const museumController = require("../controllers/museumController");

router.route("/").get(catchAsync(museumController.index));

router.route('/:id')
    .get(catchAsync(museumController.showMuseum));

module.exports = router;
