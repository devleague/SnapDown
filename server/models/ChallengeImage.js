module.exports = function(sequelize, DataTypes) {

  var ChallengeImage = sequelize.define("ChallengeImage", {

    challenge_image_id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    user_id: DataTypes.INTEGER,
    image_id: DataTypes.INTEGER,
    challenge_id: DataTypes.INTEGER

  },{

    underscored: true,
    tableName: "challengeImages",
    classMethods: {

      ChallengeImage.belongsTo(models.User, {foreignKey:"user_id", foreignKeyConstraint: true});
      ChallengeImage.belongsTo(models.Challenge, {foreignKey:"challenge_id", foreignKeyConstraint: true});
      ChallengeImage.hasOne(models.Image, {foreignKey: "image_id"});
    }
  });

  return ChallengeImage;
};