'use strict'

const workSpace = (sequelize, DataTypes) => sequelize.define('workSpaceTable', {
   
    workspace_name: {
        type: DataTypes.STRING,
        allowNull: false
        // unique: true
    },
    workspace_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
})

module.exports = workSpace;