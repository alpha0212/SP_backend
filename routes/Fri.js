const express = require("express");
const router = express.Router();
const { Fri } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const WorkFri = await Fri.findAll();
  res.json({ WorkFri: WorkFri });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const workf = await Fri.findByPk(id);
  res.json(workf);
});

//

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const WorkFri = await Fri.findAll({
    where: { user_id: id },
  });
  res.json(WorkFri);
});

router.post("/", validateToken, async (req, res) => {
  const workf = req.body;
  workf.user_name = req.user.user_name;
  workf.user_id = req.user.user_id;
  workf.UserId = req.user.id;
  await Fri.create(workf);
  res.json(workf);
});

module.exports = router;
