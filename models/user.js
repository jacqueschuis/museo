const mongoose = require("mongoose");
const passportLM = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.plugin(passportLM);

module.exports = mongoose.model("User", userSchema);
