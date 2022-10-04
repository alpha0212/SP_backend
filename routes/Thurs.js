const express = require("express");
const router = express.Router();
const { Thurs } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const WorkThurs = await Thurs.findAll();
  res.json({ WorkThurs: WorkThurs });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const workt = await Thurs.findByPk(id);
  res.json(workt);
});

//

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const WorkThurs = await Thurs.findAll({
    where: { user_id: id },
  });
  res.json(WorkThurs);
});

router.post("/", validateToken, async (req, res) => {
  const workt = req.body;
  workt.user_name = req.user.user_name;
  workt.user_id = req.user.user_id;
  workt.UserId = req.user.id;
  await Thurs.create(workt);
  res.json(workt);
});

module.exports = router;
