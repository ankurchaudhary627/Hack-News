const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
  empId: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
