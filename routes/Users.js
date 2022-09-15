const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { user_name, user_id, user_pw } = req.body;
  bcrypt.hash(user_pw, 10).then((hash) => {
    Users.create({
      user_name: user_name,
      user_id: user_id,
      user_pw: hash,
    });
    res.json("SUCCESS");
  });
});

router.get("/", async (req, res) => {
  const listOfUsers = await Users.findAll();
  res.json({ listOfUsers: listOfUsers });
});

router.post("/login", async (req, res) => {
  const { user_id, user_pw } = req.body;

  const user = await Users.findOne({ where: { user_id: user_id } });

  if (!user) {
    res.json({ error: "존재하지 않는 유저" });
  }

  bcrypt.compare(user_pw, user.user_pw).then(async (match) => {
    if (!match) {
      res.json({ error: "비밀번호가 틀립니다." });
    }

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

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["user_pw"] },
  });
  res.json(basicInfo);
});

router.put("/changepassword", async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { user_id: req.user.user_id } });

  bcrypt.compare(oldPassword, newPassword).then(async (match) => {
    if (!match) res.json({ error: "Wrong Password Entered!" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update({ user_pw: hash }, { where: { uesr_id: req.user.user_id } });
      res.json("SUCCESS");
    });
  });
});

module.exports = router;
