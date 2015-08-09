module.exports = function(sequelize, DataTypes) {

  var Challenger = sequelize.define("Challenger", {

    challenger_id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    // challenge_id: DataTypes.INTEGER,
    // user_id: DataTypes.INTEGER

  },{

    underscored: true,
    tableName: "challengers",
    classMethods: {

      associate : function(models){

        Challenger.belongsTo(models.User, {foreignKey:"user_id", foreignKeyConstraint: true});
        Challenger.hasOne(models.Challenge, {foreignKey:"challenge_id", foreignKeyConstraint: true});
        Challenger.hasOne(models.ChallengeImage, {foreignKey: "challenge_image_id"});
      }
    }
  });

  return Challenger;
};