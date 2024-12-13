const mongoose = require("mongoose");

const userSchemaf = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true, unique: true },
});

const Userfirebase = mongoose.model("User", userSchemaf);
module.exports = Userfirebase;