// module.exports = function(sequelize, DataTypes) {

//   var Image = sequelize.define("Image", {

//     image_id: {

//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },

//     // challenge_id: DataTypes.INTEGER,
//     // user_id: DataTypes.INTEGER
//     s3_reference: DataTypes.STRING

//   },{

//     underscored: true,
//     tableName: "images",
//     classMethods: {

//       associate : function(models){

//         Image.belongsTo(models.User, {foreignKey:"user_id", foreignKeyConstraint: true});
//         Image.belongsTo(models.Challenge, {foreignKey:"challenge_id", foreignKeyConstraint: true});
//       }
//     }
//   });

//   return Image;
// };