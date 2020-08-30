const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Challenge schema
const ChallengeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = Challenge = mongoose.model("challenge", ChallengeSchema);
