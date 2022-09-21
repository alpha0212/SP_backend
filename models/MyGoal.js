module.exports = (sequelize, DataType) => {
  const MyGoal = sequelize.define("MyGoal", {
    GoalMorning: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    GoalNight: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataType.STRING,
      allowNull: false,
    },
  });
  return MyGoal;
};
