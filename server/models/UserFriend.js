module.exports = function(sequelize, DataTypes) {

  var UserFriend = sequelize.define("UserFriend", {

    id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  },{

    underscored: true,
    tableName: "user_friends",
    classMethods: {

      associate : function(models){

        UserFriend.belongsTo(models.User);
        UserFriend.belongsTo(models.User);
      }
    }
  });

  return UserFriend;
};