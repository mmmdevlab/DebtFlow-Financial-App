const express = require("express");
const router = express.Router();
const User = require("../models/User");
// const { getLogger } = require("@logtape/logtape");
// const logger = getLogger(["hoots", "controllers", "usersController"]);

const create = async (req, res) => {
  logger.info(req.body);
  if (req.body.username === " ") {
    return res.status(400).json({ err: "no name" });
  }

  const user = await User.create(req.body);
  res.status(201).json({ user });
};

router.get("/", (req, res) => {
  res.json({ msg: "ok" });
});
router.post("/", create);

module.exports = router;
