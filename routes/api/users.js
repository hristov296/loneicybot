const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const mongoose = require("mongoose");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const signToken = require("../../utils/index");

// Load User model
const User = require("../../models/User");
const Progress = require("../../models/Progress");

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
  
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } 

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      // name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const newProgress = new Progress({
      _id: new mongoose.Types.ObjectId(),
      user_id: newUser._id
    })

    newUser.last_progress = newProgress._id;

    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;

        Promise.all([newUser.save(), newProgress.save()])
          .then(e => {
            const payload = {
              id: newUser._id,
              last_progress: newUser.last_progress,
              role: 'user',
              email: newUser.email
            }
            signToken(payload).then(token => res.json(token)).catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      });
    });
  })
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

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ email: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        
        const payload = {
          id: user.id,
          // name: user.name,
          last_progress: user.last_progress,
          role: user.id === keys.adminID ? 'admin' : 'user',
          email: user.email
        };

        signToken(payload)
          .then(token => res.json({'token': token.token}))
          .catch(err => console.log(err))

        // Progress.findById(user.last_progress, '-date -user_id -_id')
        // .then( progress => {
        //   payload.completed = progress.completed;
                    
        // })
        // .catch(err => console.log(err));
      } else {
        return res
          .status(400)
          .json({ password: "Password incorrect" });
      }
    });
  });
});

// @route GET api/users/currentuser
// @desc Return current user
// @access Private
router.get(
  "/currentuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;