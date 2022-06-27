"use strict";
const express = require("express");
const {savedHistory,users,workSpace,users_workSpace} = require("../models/index");
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth')


router.post("/workspace",bearerAuth, createReqHandler);
async function createReqHandler (req,res){
try {
  let body = req.body;
let createWorkSpace = await workSpace.create(body)
res.status(200).json(createWorkSpace);
} catch (error) {
  res.status(500).json(error)
}

    }        



  router.get("/workspace/:id",bearerAuth, getOneWorkSpaceHandler);

  async function getOneWorkSpaceHandler (req,res){
    try {
      let fetchData = await workSpace.findOne({where:{workspace_id:req.params.id}, include:[users]});
res.status(200).json(fetchData)
    } catch (error) {
      res.status(500).json(error)
    }

  }

  router.get("/workspace",bearerAuth, getWorkSpaceHandler);

  async function getWorkSpaceHandler (req,res){
    try {
      let fetchData = await workSpace.findAll();
res.status(200).json(fetchData)
    } catch (error) {
      res.status(500).json(error)
    }

  }
  
  router.delete("/workspace/:id", bearerAuth, deleteWorkSpaceHandler);

  async function deleteWorkSpaceHandler (req,res){
    try {
await workSpace.destroy({where:{workspace_id:req.params.id}});
res.status(200).json(`Workspace with id=${req.params.id} was deleted`)
    } catch (error) {
      res.status(500).json(error)
    }

  }

router.post("/workspace-join/:id", bearerAuth, joinHandler);


async function joinHandler(req, res) {

  let userId = req.user.dataValues.user_id;

  const newUserWorkSpace = await users_workSpace.create({
    user_id: userId,
    workspace_id: req.params.id,
  });
  res.status(200).json(newUserWorkSpace);
}

router.post("/workspace-addfriend/:id/:friendId", bearerAuth, addFriendHandler);


async function addFriendHandler(req, res) {
console.log(req.params.friendId);
  let friendId = req.params.friendId;

  const newUserWorkSpace = await users_workSpace.create({
    user_id: friendId,
    workspace_id: req.params.id,
  });
  res.status(200).json(newUserWorkSpace);
}
  module.exports = router