module.exports = (sequelize, DataTypes) => {
  const MyHabit = sequelize.define("MyHabit", {
    morning: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    morningAm: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    night: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nightAm: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sleep: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    break: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return MyHabit;
};
