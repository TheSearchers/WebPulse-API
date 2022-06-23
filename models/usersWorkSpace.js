'use strict'

const users_workSpace = (sequelize, DataTypes) => sequelize.define('users_workSpace', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      workspace_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
})

module.exports = users_workSpace;