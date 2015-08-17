module.exports = function(sequelize, DataTypes) {

  var UserStatistics = sequelize.define("UserStatistics", {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    challenges_started: DataTypes.INTEGER,
    challenges_accepted: DataTypes.INTEGER,
    challenges_declined: DataTypes.INTEGER

  },{
    underscored: true,
    tableName: "user_statistics",
    classMethods: {

      associate : function(models){

        UserStatistics.belongsTo(models.User);
      }
    }
  });

  return UserStatistics;
};