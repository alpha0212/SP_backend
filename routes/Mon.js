const express = require("express");
const router = express.Router();
const { Mon } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const WorkMon = await Mon.findAll();
  res.json({ WorkMon: WorkMon });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const workm = await Mon.findByPk(id);
  res.json(workm);
});

//

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const WorkMon = await Mon.findAll({
    where: { user_id: id },
  });
  res.json(WorkMon);
});

router.post("/", validateToken, async (req, res) => {
  const workm = req.body;
  workm.user_name = req.user.user_name;
  workm.user_id = req.user.user_id;
  workm.UserId = req.user.id;
  await Mon.create(workm);
  res.json(workm);
});

module.exports = router;
