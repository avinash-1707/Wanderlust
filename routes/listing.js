const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");

const listingController = require("../controllers/listing.js");

router
  .route("/")
  //Index Route
  .get(wrapAsync(listingController.index))
  //Create Route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  //Show route
  .get(wrapAsync(listingController.showListing))
  //Update route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  //Destroyroute
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing)
);

module.exports = router;
