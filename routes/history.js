"use strict";
const express = require("express");
const {savedHistory,users} = require("../models/index");
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth')


router.post("/workspace/:id/create-req",createReqHandler);

async function createReqHandler (req,res){
let body = req.body;
let createUrl = await savedHistory.create({
    ...body,
    user_id:req.user.dataValues.user_id,
    workspace_id:req.params.id    
})
res.status(200).json(createUrl);
    }        

  router.get("/workspace/:id/savedreq",savedReqHandler);

  async function savedReqHandler (req,res){
let fetchData = await savedHistory.findAll({where:{workspace_id:req.params.id}, include:[users]});
res.status(200).json(fetchData)
  }
  