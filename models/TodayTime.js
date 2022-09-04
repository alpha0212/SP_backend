module.exports = (sequelize, DataTypes) => {
  const TodayTime = sequelize.define("TodayTime", {
    kor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eng: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    math: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sci: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    com: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kh: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    study: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return TodayTime;
};
