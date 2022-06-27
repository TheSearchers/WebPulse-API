"use strict";
const express = require("express");
const {savedHistory,users} = require("../models/index");
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth')


router.post("/workspace/:id/create-req",bearerAuth, createReqHandler);
async function createReqHandler (req,res){
try {
  let body = req.body;
let createUrl = await savedHistory.create({
    ...body,
    user_id:req.user.dataValues.user_id,
    workspace_id:req.params.id    
})
res.status(200).json(createUrl);
} catch (error) {
  res.status(500).json(error)
}

    }        


//get all req of id workspace
  router.get("/workspace/:id/saved-req",bearerAuth, savedReqHandler);

  async function savedReqHandler (req,res){
    try {
      let fetchData = await savedHistory.findAll({where:{workspace_id:req.params.id}, include:[users]});
res.status(200).json(fetchData)
    } catch (error) {
      res.status(500).json(error)
    }

  }
  
  router.delete("/workspace/:id/remove-req/:historyId", bearerAuth, deleteReqHandler);

  async function deleteReqHandler (req,res){
    try {
      let historyId= req.params.historyId;
await savedHistory.destroy({where:{id:historyId}});
res.status(200).json(`history with id=${historyId} was deleted`)
    } catch (error) {
      res.status(500).json(error)
    }

  }

  module.exports = router