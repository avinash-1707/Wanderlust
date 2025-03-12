const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const currListing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!currListing) {
    req.flash("error", "Listing does not exist!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { currListing });
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.image = { url, filename };
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("sucess", "New Listing created!");
  res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const currListing = await Listing.findById(id);
  if (!currListing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  let originalImageUrl = currListing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { currListing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });
  if (typeof req.file != "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("sucess", "Listing updated sucessfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("sucess", "Listing deleted!");
  res.redirect("/listings");
};
