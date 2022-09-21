const express = require("express");
const router = express.Router();
const { MyHabit } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfHabits = await MyHabit.findAll();
  res.json({ listOfHabits: listOfHabits });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const habit = await MyHabit.findByPk(id);
  res.json(habit);
});

//

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfHabits = await MyHabit.findAll({
    where: { UserId: id },
  });
  res.json(listOfHabits);
});

router.post("/", validateToken, async (req, res) => {
  const habit = req.body;
  habit.user_id = req.user.user_name;
  habit.UserId = req.user.id;
  await MyHabit.create(habit);
  res.json(habit);
});
module.exports = router;
