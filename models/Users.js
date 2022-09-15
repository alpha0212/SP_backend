module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_pw: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Users.associate = (models) => {
    Users.hasMany(models.TodayTime, {
      onDelete: "cascade",
    });
  };

  return Users;
};
