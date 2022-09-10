module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define("Teacher", {
    t_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    t_pw: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    t_job: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Teacher;
};
