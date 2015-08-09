module.exports = function(sequelize, DataTypes) {

  var ChallengeImage = sequelize.define("ChallengeImage", {

    challenge_image_id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    s3_reference: DataTypes.STRING,
    privacy_status: STRING

  },{

    underscored: true,
    tableName: "challenge_images",
    classMethods: {

      associate : function(models){

        ChallengeImage.belongsTo(models.Challenger, {foreignKey:"challenger_id", foreignKeyConstraint: true});
      }
    }
  });

  return ChallengeImage;
};