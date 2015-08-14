module.exports = function(sequelize, DataTypes) {

  var Challenge = sequelize.define("Challenge", {

    id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    start_at: DataTypes.BIGINT,
    expire_at: DataTypes.BIGINT,
    name: DataTypes.STRING,
    privacy_status: DataTypes.STRING

  },{

    underscored: true,
    tableName: "challenges",
    classMethods: {

      associate : function(models){

        Challenge.hasMany(models.Challenger/*, {foreignKey:"challenger_id", foreignKeyConstraint: true}*/);
      }
    }
  });

  return Challenge;
};