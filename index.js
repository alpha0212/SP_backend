const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());

const db = require("./models");

const timeRouter = require("./routes/TodayTime");
app.use("/todaytimes", timeRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", (req, res) => {
  res.send("pong");
});

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log("Server running on port 8000");
  });
});
