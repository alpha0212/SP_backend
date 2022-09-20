module.exports = (sequelize, DataTypes) => {
  const TodayTime = sequelize.define("TodayTime", {
    kor: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    eng: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    math: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    sci: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    com: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    kh: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    study: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return TodayTime;
};
