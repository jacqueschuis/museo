const express = require("express");
const router = express.Router();
const { isAdmin } = require("../utilities/middleware");

const devController = require("../controllers/devController");

const catchAsync = require("../utilities/catchasync");

router.get("/", isAdmin, devController.devHome);

router
  .route("/newmuseum")
  .get(isAdmin, devController.newMuseumForm)
  .post(isAdmin, catchAsync(devController.newDevMuseum));

module.exports = router;
