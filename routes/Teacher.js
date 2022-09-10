const express = require("express");
const router = express.Router();
const { Teacher } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.get("/", validateToken, async (req, res) => {
  const listOfTea = await Teacher.findAll();
  res.json({ listOfTea: listOfTea });
});

router.post("/login", async (req, res) => {
  const { t_id, t_pw, t_job } = req.body;

  const teacher = await Teacher.findOne({ where: { t_id: t_id } });
  const pw = await Teacher.findOne({ where: { t_pw: t_pw } });
  const job = await Teacher.findOne({ where: { t_job: t_job } });

  if (!teacher) {
    res.json({ error: "아이디가 잘못되었습니다." });
  } else if (!job) {
    res.json({ error: "teacher을 다시 입력해주세요." });
  } else if (!pw) {
    res.json({ error: "비밀번호가 틀립니다." });
  } else {
    const accessToken = sign(
      { t_id: teacher.t_id, t_job: job.t_job, id: teacher.id },
      "importantsecret"
    );
    res.json({ token: accessToken, t_id: t_id, id: teacher.id });
  }
});

router.get("/teacher", validateToken, (req, res) => {
  res.json(req.teacher);
});

module.exports = router;
