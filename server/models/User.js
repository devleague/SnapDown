module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define("User", {

    id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    user_name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    facebook_id: DataTypes.STRING,
    facebook_image_url: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    device_token: DataTypes.STRING,

  },{

    underscored: true,
    tableName: "users",
    classMethods: {

      associate : function(models){

        User.hasMany(models.Challenger);
        User.hasMany(models.UserFriend);
        User.belongsTo(models.Provider);
      }
    }
  });

  return User;
};