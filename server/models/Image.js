module.exports = function(sequelize, DataTypes) {

  var Image = sequelize.define("Image", {

    id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    s3_reference: DataTypes.STRING,
    privacy_status: DataTypes.STRING

  },{

    underscored: true,
    tableName: "images",
    classMethods: {

      associate : function(models){

        Image.belongsTo(models.Challenger/*, {foreignKey:"challenger_id", foreignKeyConstraint: true}*/);
      }
    }
  });

  return Image;
};