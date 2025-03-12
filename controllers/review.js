const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;

  listing.reviews.push(newReview._id);

  await newReview.save();
  await listing.save();

  req.flash("sucess", "New Review added!");
  res.redirect(`/listings/${listing.id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash("sucess", "Review deleted!");
  res.redirect(`/listings/${id}`);
};
