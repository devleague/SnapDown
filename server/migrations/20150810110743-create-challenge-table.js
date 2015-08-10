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
    'challenges',
    {

      id: {

        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      start_at: DataTypes.DATE,
      expire_at: DataTypes.DATE,
      name: DataTypes.STRING,
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
    migration.dropTable('challenges');
  }
};