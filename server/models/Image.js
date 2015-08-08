module.exports = function(sequelize, DataTypes) {

  var Image = sequelize.define("Image", {

    image_id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    s3_reference: DataTypes.STRING,
    challenge_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  },{

    underscored: true,
    tableName: "images",
    classMethods: {

      Image.belongsTo(models.User, {foreignKey:"user_id", foreignKeyConstraint: true});
      Image.belongsTo(models.Challenge, {foreignKey:"challenge_id", foreignKeyConstraint: true});
    }
  });

  return Image;
};