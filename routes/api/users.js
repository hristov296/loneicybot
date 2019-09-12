const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const signToken = require("../../utils/index");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" });
    }

    const newUser = new User({
      // name: req.body.name,
      username: req.body.username,
      password: req.body.password,
    });

    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;

        newUser
          .save()
          .then(e => {
            const payload = {
              id: newUser._id,
              role: "user",
              username: newUser.username,
            };
            signToken(payload)
              .then(token => res.json(token))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      });
    });
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  // Find user by email
  User.findOne({ username }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ username: "Username not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload

        const payload = {
          id: user.id,
          username: user.username,
        };

        signToken(payload)
          .then(token => res.json({ token: token.token }))
          .catch(err => console.log(err));

        // })
        // .catch(err => console.log(err));
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

// @route GET api/users/currentuser
// @desc Return current user
// @access Private
router.get("/currentuser", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
  });
});

module.exports = router;
