module.exports = function(sequelize, DataTypes) {

  var ChallengeUser = sequelize.define("ChallengeUser", {

    challenge_user_id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    challenge_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER

  },{

    underscored: true,
    tableName: "challengeUsers",
    classMethods: {

      ChallengeUser.belongsTo(models.User, {foreignKey:"user_id", foreignKeyConstraint: true});
      ChallengeUser.belongsTo(models.Challenge, {foreignKey:"challenge_id", foreignKeyConstraint: true});
    }
  });

  return ChallengeUser;
};