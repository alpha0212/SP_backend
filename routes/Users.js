const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");

const { sign } = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const listOfPosts = await Users.findAll();
  res.json(listOfPosts);
});

router.post("/", async (req, res) => {
  const { user_name, user_email, user_id, user_pw, user_ch_pw } = req.body;
  bcrypt.hash(user_pw, 10).then((hash) => {
    Users.create({
      user_id: user_id,
      user_pw: hash,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { user_id, user_pw } = req.body;

  const user = await Users.findOne({ where: { user_id: user_id } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(user_pw, user.user_pw).then(async (match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    const accessToken = sign(
      { user_id: user.user_id, id: user.id },
      "importantsecret"
    );
    res.json({ token: accessToken, user_id: user_id, id: user.id });
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
