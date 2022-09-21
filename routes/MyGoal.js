const express = require("express");
const router = express.Router();
const { MyGoal } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfGoals = await MyGoal.findAll();
  res.json({ listOfGoals: listOfGoals });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const goal = await MyGoal.findByPk(id);
  res.json(goal);
});

//

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfGoals = await MyGoal.findAll({
    where: { UserId: id },
  });
  res.json(listOfGoals);
});

router.post("/", validateToken, async (req, res) => {
  const goal = req.body;
  goal.user_id = req.user.user_id;
  goal.UserId = req.user.id;
  await MyGoal.create(goal);
  res.json(goal);
});

module.exports = router;
