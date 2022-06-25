"use strict";

const userWorkSpace = (sequelize, DataTypes) =>
  sequelize.define("workSpaceTable", {
    workSpaseName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      outoIncrement: true,
      // unique: true
    },
    workSpaceId: {
      type: DataTypes.INTEGER,
      primaryKey: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = userWorkSpace;
