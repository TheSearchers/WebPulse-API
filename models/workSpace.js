"use strict";

const workSpace = (sequelize, DataTypes) =>
  sequelize.define("workSpaceTable", {
    workSpaseName: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true
    },
    workSpaceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      outoIncrement: true,
    },
  });

module.exports = workSpace;
