"use strict";
const express = require("express");
const {savedHistory,users,workSpace,users_workSpace} = require("../models/index");
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth')


router.post("/workspace/:id",bearerAuth, createReqHandler);
async function createReqHandler (req,res){
try {
  // console.log(req.data);
  let body = req.body.workspace_name;
  // console.log("dfsdfsd",body);
let createWorkSpace = await workSpace.create({
  workspace_name:body,
})
console.log("fgdgdf",req.params.id);
console.log("fgdgdf",createWorkSpace.workspace_id);
const newUserWorkSpace = await users_workSpace.create({
  user_id: req.params.id,
  workspace_id:createWorkSpace.workspace_id ,
});

res.status(200).json(createWorkSpace);
} catch (error) {
  res.status(500).json(error)
}

    }        


// get workspace by id
  router.get("/workspace/:id",bearerAuth, getOneWorkSpaceHandler);

  async function getOneWorkSpaceHandler (req,res){
    try {
      let fetchData = await workSpace.findOne({where:{workspace_id:req.params.id}, include:[users]});
res.status(200).json(fetchData)
    } catch (error) {
      res.status(500).json(error)
    }

  }
//get all workspaces for all users
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

router.post("/workspace-addfriend/:id", bearerAuth, addFriendHandler);


async function addFriendHandler(req, res) {
  let body = req.body.workspace_name;
  console.log(body);

try{
  
  const friend=await users.findOne({where :{email:body}})
  const newUserWorkSpace = await users_workSpace.create({
    user_id: friend.user_id,
    workspace_id: req.params.id,
  });
  console.log(newUserWorkSpace);
  res.status(200).json(newUserWorkSpace);
}catch{
  console.log("not found")
  res.send("user not found")
}

}
  module.exports = router