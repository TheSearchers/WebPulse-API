"use strict";

const history = (sequelize, DataTypes) =>
  sequelize.define("historyTable", {
    historyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passuserId: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    tokworkSpaceId: {
      type: DataTypes.INTEGER,
    },
  });

module.exports = history;
