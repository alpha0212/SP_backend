const express = require("express");
const router = express.Router();
const { Wednes } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const WorkWednes = await Wednes.findAll();
  res.json({ WorkWednes: WorkWednes });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const workw = await Wednes.findByPk(id);
  res.json(workw);
});

//

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const WorkWednes = await Wednes.findAll({
    where: { user_id: id },
  });
  res.json(WorkWednes);
});

router.post("/", validateToken, async (req, res) => {
  const workw = req.body;
  workw.user_name = req.user.user_name;
  workw.user_id = req.user.user_id;
  workw.UserId = req.user.id;
  await Wednes.create(workw);
  res.json(workw);
});

module.exports = router;
