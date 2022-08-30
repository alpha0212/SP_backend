module.exports = (sequelize, DataTypes) => {
  const TodayTime = sequelize.define("TodayTime", {
    kor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    eng: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    math: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sci: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    com: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kh: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    study: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return TodayTime;
};
