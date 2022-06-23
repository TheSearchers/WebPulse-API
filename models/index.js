'use strict'
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const users = require('./userModel.js');
const workSpace=require('./workSpace');
const savedHistory=require('./history');
const users_workSpace=require('./usersWorkSpace')

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;


let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
const usersModel= users(sequelize, DataTypes)
  const  workSpaceModel= workSpace(sequelize, DataTypes)
   const savedHistoryModel= savedHistory(sequelize, DataTypes)
    const users_workSpaceModel= users_workSpace(sequelize, DataTypes)
    
users.belongsToMany(workSpace, {
     through: users_workSpace,
     foreignKey: "user_id",
   });
   workSpace.belongsToMany(users, {
     through: users_workSpace,
     foreignKey: "workSpace_id",
 });

  users.hasMany(savedHistory, { foreignKey: "user_id" });
  savedHistory.belongsTo(users, { foreignKey: "user_id" });

  workSpace.hasMany(savedHistory, { foreignKey: "workspace_id" });
  savedHistory.belongsTo(workSpace, { foreignKey: "workspace_id" });

module.exports = {
    db: sequelize,
    users:usersModel,
    workSpace:workSpaceModel,
    savedHistory:savedHistoryModel,
    users_workSpace:users_workSpaceModel

}