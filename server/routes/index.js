const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import authenticator
const authenticateUser = require("../controllers/authenticate.js");

// Import Models
const User = require("../models/user.model");

// Sign up
router.post("/signup", async (req, res) => {
  let username = req.body.username;
  let passwordHash = await bcrypt.hash(req.body.password, 12);
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

// Login
router.post("/login", (req, res) => {
  let { username, password } = req.body;
  User.findOne({ username: username })
    .then(async (user) => {
      if (!user) {
        res.status(401).json({ message: "Invalid username or password" });
      } else {
        const isPasswordValid = await bcrypt.compare(
          password,
          user.passwordHash
        );

        if (!isPasswordValid) {
          res.status(401).json({ message: "Invalid username or password" });
          return;
        }

        const token = jwt.sign(
          { userId: user._id, email: user.email },
          "secret",
          { expiresIn: "1h" }
        );
        res.status(200).json({ token });
      }
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
