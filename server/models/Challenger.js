module.exports = function(sequelize, DataTypes) {

  var Challenger = sequelize.define("Challenger", {

    id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    initiator_flag: DataTypes.BOOLEAN

  },{

    underscored: true,
    tableName: "challengers",
    classMethods: {

      associate : function(models){

        Challenger.belongsTo(models.User);
        Challenger.belongsTo(models.Challenge);
        Challenger.hasOne(models.Image);
      }
    }
  });

  return Challenger;
};