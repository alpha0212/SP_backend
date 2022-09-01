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

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await TodayTime.findAll({
    where: { UserId: id },
  });
  res.json(listOfPosts);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.user_name = req.user.user_name;
  post.UserId = req.user.id;
  await TodayTime.create(post);
  res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await TodayTime.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
