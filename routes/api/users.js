const express = require("express");
const router = express.Router();

// User model
const User = require("../../models/User");

// @route  GET api/users/getAll
// @desc   Get all users
// @access Public
router.get("/getAll", (req, res) => {
  User.find().then((users) => res.json(users));
});

// @route  POST api/users/getByID
// @desc   Get user by id
// @access Public
router.post("/getById", (req, res) => {
  User.findOne({ empId: req.body.empId }).then((user) => {
    if (user === null) {
      res.json(null);
    } else {
      res.json(user);
    }
  });
});

// @route  POST api/users/add
// @desc   Add user
// @access Public
router.post("/add", (req, res) => {
  User.findOne({ empId: req.body.empId }).then((user) => {
    if (user === null) {
      const newUser = new User({
        empId: req.body.empId,
      });
      newUser.save().then((user) => res.json(user));
    } else {
      res.json(null);
    }
  });
});

module.exports = router;
