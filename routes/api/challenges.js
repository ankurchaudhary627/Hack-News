const express = require("express");
const router = express.Router();

// Challenge model
const Challenge = require("../../models/Challenge");

// @route  GET api/challenges/getAll
// @desc   Get all challenges
// @access Public
router.get("/getAll", (req, res) => {
  Challenge.find().then((challenges) => res.json(challenges));
});

// @route  POST api/challenges/add
// @desc   Add challenge
// @access Public
router.post("/add", (req, res) => {
  Challenge.findOne({
    title: req.body.title,
    createdBy: req.body.createdBy,
  }).then((challenge) => {
    if (challenge === null) {
      const newChallenge = new Challenge({
        title: req.body.title,
        description: req.body.description,
        tags: getTags(req.body.tags),
        createdBy: req.body.createdBy,
      });
      newChallenge.save().then((challenge) => res.json(challenge));
    } else {
      res.status(303).json({
        message: "Challenge already exists!",
      });
    }
  });
});

// @route  UPDATE api/update/:id
// @desc   Update vote count by id
// @access Public
router.post("/update/:id", (req, res) => {
  Challenge.findById(req.params.id).then((challenge) => {
    if (challenge !== null) {
      const oldVoteCount = challenge.voteCount;
      Challenge.findByIdAndUpdate(
        req.params.id,
        {
          voteCount: oldVoteCount + 1,
        },
        { new: true }
      ).then((updatedChallenge) => res.json(updatedChallenge));
    } else {
      res.status(404).json({
        message: "Challenge not found!",
      });
    }
  });
});

const getTags = (tagsArray) => {
  return tagsArray.join(";");
};

module.exports = router;
