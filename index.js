const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = require("./models");

const timeRouter = require("./routes/TodayTime");
app.use("/todaytimes", timeRouter);
const habitRouter = require("./routes/MyHabit");
app.use("/myhabit", habitRouter);
const goalRouter = require("./routes/MyGoal");
app.use("/mygoal", goalRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const teacherRouter = require("./routes/Teacher");
app.use("/teacher", teacherRouter);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Date: Date.now(),
  });
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

db.sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log("Server running on port 8080");
  });
});
