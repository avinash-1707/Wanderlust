const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");

const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get(userController.renderSignUpForm)
  .post(wrapAsync(userController.signUpUser));

router
  .route("/login")
  .get(userController.renderLoginPage)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(userController.logInUser)
  );

router.get("/logout", userController.logOutUser);

module.exports = router;
