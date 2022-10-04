const express = require("express");
const router = express.Router();
const { Tues } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const TuesWork = await Tues.findAll();
  res.json({ TuesWork: TuesWork });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const worktues = await Tues.findByPk(id);
  res.json(worktues);
});

//

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const TuesWork = await Tues.findAll({
    where: { user_id: id },
  });
  res.json(TuesWork);
});

router.post("/", validateToken, async (req, res) => {
  const worktues = req.body;
  worktues.user_name = req.user.user_name;
  worktues.user_id = req.user.user_id;
  worktues.UserId = req.user.id;
  await Tues.create(worktues);
  res.json(worktues);
});

module.exports = router;
