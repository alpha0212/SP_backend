const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
app.use(cors());
router.post("/", async (req, res) => {
  const { user_name, user_id, user_pw, user_agree } = req.body;
  Users.findOne({ where: { user_id: user_id } }).then((data) => {
    if (data) {
      res.status(400).json({
        result: false,
        message: "이미 존재하는 아이디입니다.",
      });
    } else {
      bcrypt.hash(user_pw, 10).then((hash) => {
        Users.create({
          user_name: user_name,
          user_id: user_id,
          user_pw: hash,
          user_agree: user_agree,
        })
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            res.send(err);
          });
      });
    }
  });
});

router.get("/", async (req, res) => {
  const user = await Users.findAll();
  res.json(user); //배열 괄호 안줘서 length를 사용가능
});

router.get("/sts", async (req, res) => {
  const listOfUsers = await Users.findAll();
  res.json({ listOfUsers: listOfUsers });
});

router.post("/login", async (req, res) => {
  const { user_id, user_name, user_pw, user_agree } = req.body;

  const user = await Users.findOne({
    where: { user_id: user_id },
  });

  if (!user) {
    res.json({ error: "존재하지 않는 유저" });
  }

  bcrypt.compare(user_pw, user.user_pw).then(async (match) => {
    if (!match) {
      res.json({ error: "비밀번호가 틀립니다." });
    }

    const accessToken = sign(
      {
        user_id: user.user_id,
        user_name: user.user_name,
        user_agree: user.user_agree,
        id: user.id,
      },
      "importantsecret"
    );
    res.json({
      token: accessToken,
      user_id: user_id,
      user_name: user_name,
      user_agree: user_agree,
      id: user.id,
    });
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
