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

router.get("/api/data/:id", async (req, res) => {
  const name = req.params.id;
  TodayTime.findAll({
    where: { user_id: name },
  }).then((result) => {
    res.send(result);
  });
});

router.get("/byuserId/:id", async (req, res) => {
  //user_id로 유저의 시간 데이터를 표시할 수 있다.
  //그래프가 경로상에 떠있는 아이디로 axios get 요청을 하기 때문에
  const name = req.params.id;
  const listOfPosts = await TodayTime.findAll({
    where: { user_id: name },
  });
  res.json(listOfPosts);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.user_name = req.user.user_name;
  post.user_id = req.user.user_id;
  post.UserId = req.user.id;
  await TodayTime.create(post);
  res.json(post);
});

module.exports = router;
