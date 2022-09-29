module.exports = (sequelize, DataTypes) => {
  const TodayTime = sequelize.define("TodayTime", {
    kor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eng: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    math: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sci: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    com: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kh: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    study: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_name: {
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
