"use strict";
const express = require("express");
const { history, users } = require("../models/index");
const router = express.Router();
const bearerAuth = require("../middlewares/bearerAuth");

router.post("/workspace/:id/create-req", createReqHandler);

async function createReqHandler(req, res) {
  let body = req.body;
  let createUrl = await history.create({
    ...body,
    userId: req.user.dataValues.userId,
    workspaceId: req.params.id,
  });
  res.status(200).json(createUrl);
}

router.get("/workspace/:id/savedreq", savedReqHandler);

async function savedReqHandler(req, res) {
  let fetchData = await history.findAll({
    where: { workspaceId: req.params.id },
    include: [users],
  });
  res.status(200).json(fetchData);
}
