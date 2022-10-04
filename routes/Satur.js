const express = require("express");
const router = express.Router();
const { Satur } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const WorkSatur = await Satur.findAll();
  res.json({ WorkSatur: WorkSatur });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const workSa = await Satur.findByPk(id);
  res.json(workSa);
});

//

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const WorkSatur = await Satur.findAll({
    where: { user_id: id },
  });
  res.json(WorkSatur);
});

router.post("/", validateToken, async (req, res) => {
  const workSa = req.body;
  workSa.user_name = req.user.user_name;
  workSa.user_id = req.user.user_id;
  workSa.UserId = req.user.id;
  await Satur.create(workSa);
  res.json(workSa);
});

module.exports = router;
