"use strict";
const express = require("express");
const {savedHistory,users,workSpace} = require("../models/index");
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



//   router.get("/workspace/:id/saved-req",bearerAuth, savedReqHandler);

//   async function savedReqHandler (req,res){
//     try {
//       let fetchData = await savedHistory.findAll({where:{workspace_id:req.params.id}, include:[users]});
// res.status(200).json(fetchData)
//     } catch (error) {
//       res.status(500).json(error)
//     }

//   }
  
//   router.delete("/workspace/:id/remove-req/:historyId", bearerAuth, deleteReqHandler);

//   async function deleteReqHandler (req,res){
//     try {
//       let historyId= req.params.historyId;
// await savedHistory.destroy({where:{id:historyId}});
// res.status(200).json(`history with id=${historyId} was deleted`)
//     } catch (error) {
//       res.status(500).json(error)
//     }

//   }

  module.exports = router