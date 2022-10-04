module.exports = (sequelize, DataType) => {
  const Fri = sequelize.define("Fri", {
    WorkOne: {
      type: DataType.STRING,
      allowNull: true,
    },
    WorkTwo: {
      type: DataType.STRING,
      allowNull: true,
    },
    WorkThree: {
      type: DataType.STRING,
      allowNull: true,
    },
    WorkFour: {
      type: DataType.STRING,
      allowNull: true,
    },
    WorkFive: {
      type: DataType.STRING,
      allowNull: true,
    },
    WorkSix: {
      type: DataType.STRING,
      allowNull: true,
    },
    WorkSeven: {
      type: DataType.STRING,
      allowNull: true,
    },
    WorkEight: {
      type: DataType.STRING,
      allowNull: true,
    },
    WorkNine: {
      type: DataType.STRING,
      allowNull: true,
    },
    WorkTen: {
      type: DataType.STRING,
      allowNull: true,
    },
  });
  return Fri;
};
