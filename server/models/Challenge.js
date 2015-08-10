module.exports = function(sequelize, DataTypes) {

  var Challenge = sequelize.define("Challenge", {

    id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    start_at: DataTypes.DATE,
    expire_at: DataTypes.DATE,
    name: DataTypes.STRING,
    privacy_status: DataTypes.STRING

  },{

    underscored: true,
    tableName: "challenges",
    classMethods: {

      associate : function(models){

        Challenge.belongsTo(models.Challenger/*, {foreignKey:"challenger_id", foreignKeyConstraint: true}*/);
      }
    }
  });

  return Challenge;
};