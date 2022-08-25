const express = require("express");
const router = express.Router();
const { TodayTime } = require("../models");

router.get("/", async (req, res) => {
  const listOfToday = await TodayTime.findAll();
  res.json(listOfToday);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const time = await TodayTime.FindByPk(id);
  res.json(time);
});

router.post("/", async (req, res) => {
  const time = req.body;
  await TodayTime.create(time);
  res.json(time);
});

module.exports = router;
