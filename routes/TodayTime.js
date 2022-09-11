const express = require("express");
const router = express.Router();
const { TodayTime } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await TodayTime.findAll();
  res.json({ listOfPosts: listOfPosts });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await TodayTime.findByPk(id);
  res.json(post);
});

//

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await TodayTime.findAll({
    where: { id: id },
  });
  res.json(listOfPosts);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.user_id = req.user.user_id;
  await TodayTime.create(post);
  res.json(post);
});

module.exports = router;
