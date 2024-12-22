const router = require("express").Router();
const bcrypt = require("bcryptjs");

// Import authenticator
const checkLogin = require("../controllers/authenticate.js");

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
  Admin.findOne({ username: username })
    .then((record) => {
      if (!record) {
        res.json(`${username} not found`);
      } else {
        const payload = {
          username,
          password,
        };
        const token = jwt.sign(payload, "secret", { expiresIn: "1h" });
        res.json(token);
      }
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
