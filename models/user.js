const mongoose = require("mongoose");
const passportLM = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  isAdmin: Boolean,
});

userSchema.virtual('fullName').get(() => {
  return `${this.firstName} ${this.lastName}`
})

userSchema.plugin(passportLM);

module.exports = mongoose.model("User", userSchema);
