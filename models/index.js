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
const userModel= users(sequelize, DataTypes)
  const  workSpaceModel= workSpace(sequelize, DataTypes)
   const savedHistoryModel= savedHistory(sequelize, DataTypes)
    const users_workSpaceModel= users_workSpace(sequelize, DataTypes)

    // userModel.belongsToMany(userModel, {
    //     as:"User", // forgin key alias
    //     through: "follow", // table which wil be created automatically
    //     foreignKey: "user_id",
    //   });
    //   userModel.belongsToMany(userModel, {
    //     as:"Followed", // forgin key alias
    //     through: "follow", // joined table from above
    //     foreignKey: "followed_id",
    // });

userModel.belongsToMany(workSpaceModel, {
     through: users_workSpaceModel,
     foreignKey: "user_id",
   });
   workSpaceModel.belongsToMany(userModel, {
     through: users_workSpaceModel,
     foreignKey: "workspace_id",
 });

  userModel.hasMany(savedHistoryModel, { foreignKey: "user_id" });
  savedHistoryModel.belongsTo(userModel, { foreignKey: "user_id" });

  workSpaceModel.hasMany(savedHistoryModel, { foreignKey: "workspace_id" });
  savedHistoryModel.belongsTo(workSpaceModel, { foreignKey: "workspace_id" });

module.exports = {
    db: sequelize,
    users:userModel,
    workSpace:workSpaceModel,
    savedHistory:savedHistoryModel,
    users_workSpace:users_workSpaceModel

}