const router = require("express").Router();

// Import authenticator
const checkLogin = require("../controllers/authenticate.js");

// Import Models
const User = require("../models/user.model");

// Sign up
router.post("/", (req, res) => {
  let username = req.body.username;
  let passwordHash = req.body.passwordHash;
  let email = req.body.email;
  let profilePicture = req.body.profilePicture;
  let isAnonymous = req.body.isAnonymous;
  const newUser = new User({
    username,
    passwordHash,
    email,
    profilePicture,
    isAnonymous,
  });
  newUser
    .save()
    .then(() => res.json(`User ${username} created successfully`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
