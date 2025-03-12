const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

//passport local mongoose automatically includes username, hashed password and salt value
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
