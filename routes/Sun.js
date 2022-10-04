const express = require("express");
const router = express.Router();
const { Sun } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const WorkSun = await Sun.findAll();
  res.json({ WorkSun: WorkSun });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const works = await Sun.findByPk(id);
  res.json(works);
});

//

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const WorkSun = await Sun.findAll({
    where: { user_id: id },
  });
  res.json(WorkSun);
});

router.post("/", validateToken, async (req, res) => {
  const works = req.body;
  works.user_name = req.user.user_name;
  works.user_id = req.user.user_id;
  works.UserId = req.user.id;
  await Sun.create(works);
  res.json(works);
});

module.exports = router;
