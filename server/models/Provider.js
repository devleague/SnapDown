module.exports = function(sequelize, DataTypes) {

  var Provider = sequelize.define("Provider", {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: DataTypes.STRING,

  },{
    underscored: true,
    tableName: "providers",
  });

  return Provider;
};