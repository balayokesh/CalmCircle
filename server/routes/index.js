const router = require("express").Router();

router.get("/", () => {
  console.log("Called index route");
});

module.exports = router;
