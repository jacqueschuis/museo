const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const users = require("../controllers/userController");

const catchAsync = require("../utilities/catchasync");

router
  .route("/register")
  .get(users.registerForm)
  .post(catchAsync(users.registerUser));

router
  .route("/login")
  .get(users.loginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
      keepSessionInfo: true,
    }),
    catchAsync(users.loginUser)
  );

router.get("/logout", users.logout);

router.route("/users/:id").get(catchAsync(users.show));

module.exports = router;
