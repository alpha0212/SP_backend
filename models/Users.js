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
    user_agree: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Users.associate = (models) => {
    Users.hasMany(models.TodayTime, {
      onDelete: "cascade",
    });
    Users.hasMany(models.MyGoal, {
      onDelete: "cascade",
    });
    Users.hasMany(models.MyHabit, {
      onDelete: "cascade",
    });
    Users.hasMany(models.Sun, {
      onDelete: "cascade",
    });
    Users.hasMany(models.Tues, {
      onDelete: "cascade",
    });
    Users.hasMany(models.Wednes, {
      onDelete: "cascade",
    });
    Users.hasMany(models.Thurs, {
      onDelete: "cascade",
    });
    Users.hasMany(models.Fri, {
      onDelete: "cascade",
    });
    Users.hasMany(models.Satur, {
      onDelete: "cascade",
    });
    Users.hasMany(models.Sun, {
      onDelete: "cascade",
    });
  };
  return Users;
};
