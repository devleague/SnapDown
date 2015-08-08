module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define("User", {

    user_id: {

      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    facebook_id: DataTypes.STRING,
    facebook_image_url: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  },{

    underscored: true,
    tableName: "users",
    classMethods: {

      associate : function(models){

        User.hasMany(models.Image);
        User.hasMany(models.Challenge);
        User.hasMany(models.ChallengeImage);
        User.hasMany(models.ChallengeUser);
        User.hasMany(models.UserFriend);
      }
    }
  });

  return User;
};