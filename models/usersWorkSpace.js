'use strict'

const users_workSpace = (sequelize, DataTypes) => sequelize.define('users_workSpace', {
    
    users_workSpace_id: {
        type: DataTypes.INTEGER,
        allowNull:false, 
        primaryKey: true,
        autoIncrement: true,
      },
    
    user_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
      },
      workspace_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
      },
})

module.exports = users_workSpace;