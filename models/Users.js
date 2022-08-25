module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_email: {
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
    user_ch_pw: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Users;
};
