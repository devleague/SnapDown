'use strict';

module.exports = {
  up: function (migration, DataTypes) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   migration.createTable(
    'users',
    {

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
    });
  },

  down: function (migration, DataTypes) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    migration.dropTable('users');
  }
};
