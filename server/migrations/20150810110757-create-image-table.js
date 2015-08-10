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
    'images',
    {

      id: {

        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      s3_reference: DataTypes.STRING,
      privacy_status: DataTypes.STRING
    });
  },

  down: function (migration, DataTypes) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    migration.dropTable('images');
  }
};