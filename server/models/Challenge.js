module.exports = function(sequelize, DataTypes) {

  var Challenge = sequelize.define("Challenge", {

    challenge_id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    user_id: DataTypes.INTEGER,
    start_at: DataTypes.DATE,
    expire_at: DataTypes.DATE,
    name: DataTypes.STRING
  },{

    underscored: true,
    tableName: "challenges",
    classMethods: {

      Challenge.belongsTo(models.User, {foreignKey:"user_id", foreignKeyConstraint: true});
    }
  });

  return Challenge;
};