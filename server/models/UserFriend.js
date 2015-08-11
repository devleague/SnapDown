module.exports = function(sequelize, DataTypes) {

  var UserFriend = sequelize.define("UserFriend", {

    id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    // user_id: DataTypes.INTEGER,
    // friend_id: DataTypes.INTEGER
  },{

    underscored: true,
    tableName: "user_friends",
    classMethods: {

      associate : function(models){

        UserFriend.belongsTo(models.User/*, {foreignKey:"user_id", foreignKeyConstraint: true}*/);
        UserFriend.belongsTo(models.User/*, {foreignKey:"friend_id", foreignKeyConstraint: true}*/);
      }
    }
  });

  return UserFriend;
};