const express = require("express");
const router = express.Router();
const { TodayTime } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfToday = await TodayTime.findAll();
  res.json(listOfToday);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const time = await TodayTime.FindByPk(id);
  res.json(time);
});

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfToday = await TodayTime.findAll({
    where: { Userid: id },
  });
  res.json(listOfToday);
});

router.put("/TodayPost", validateToken, async (req, res) => {
  const { newTime, id } = req.body;
  await Posts.update({ TodayPost: newTime }, { where: { id: id } });
  res.json(newTime);
});

router.post("/", validateToken, async (req, res) => {
  const time = req.body;
  post.user_name = req.user_name;
  post.UserId = req.user.id;
  await TodayTime.create(time);
  res.json(time);
});

module.exports = router;
