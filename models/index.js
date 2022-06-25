"use strict";
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const users = require("./userModel.js");
const history = require("./history");
const workSpace = require("./workSpace");
const userWorkSpace = require("./userWorkSpace");

const POSTGRES_URI =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const historyModel = history(sequelize, DataTypes);
const userModel = users(sequelize, DataTypes);
const workSpaceModel = workSpace(sequelize, DataTypes);
const userWorkSpaceModel = userWorkSpace(sequelize, DataTypes);

userModel.belongsToMany(workSpaceModel, {
  through: userWorkSpaceModel,
  foreignKey: "userId",
});
workSpaceModel.belongsToMany(userModel, {
  through: userWorkSpaceModel,
  foreignKey: "workSpaceId",
});

userModel.hasMany(historyModel, { foreignKey: "userId" });
historyModel.belongsTo(userModel, { foreignKey: "userId" });

workSpaceModel.hasMany(historyModel, { foreignKey: "workspaceId" });
// historyModel.belongsTo(workSpaceModel, { foreignKey: "workspaceId" });

module.exports = {
  db: sequelize,
  users: userModel,
  history: historyModel,
  workSpace: workSpaceModel,
  userWorkSpace: userWorkSpaceModel,
};
