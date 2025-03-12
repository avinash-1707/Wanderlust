const User = require("../models/user.js");

module.exports.renderSignUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signUpUser = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });

    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("sucess", "User registered successfully!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginPage = (req, res) => {
  res.render("users/login.ejs");
};

//NOT ACTUALLY
module.exports.logInUser = async (req, res) => {
  req.flash(`sucess", "Welcome back to Wanderlust`);
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logOutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("sucess", "Logged you out.");
    return res.redirect("/listings");
  });
};
