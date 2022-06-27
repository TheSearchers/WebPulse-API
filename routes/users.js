"use strict";
const express = require("express");
const {savedHistory,users,workSpace,users_workSpace} = require("../models/index");
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth')

    



  router.get("/user/:id",bearerAuth, getUserWorkSpaceHandler);

  async function getUserWorkSpaceHandler (req,res){
    try {
      let fetchData = await users.findOne({where:{user_id:req.params.id}, include:[workSpace,savedHistory]});
res.status(200).json(fetchData)
    } catch (error) {
      res.status(500).json(error)
    }

  }

  router.get("/users",bearerAuth, getUsersHandler);

  async function getUsersHandler (req,res){
    try {
      let fetchData = await users.findAll();
res.status(200).json(fetchData)
    } catch (error) {
      res.status(500).json(error)
    }

  }
  // async function findOneUser(){
  //   try {
  //     const user = await this.models.User.findOne({where: {firstName: 'wdj'}});
  //     return user;
  //   } catch (err) {
  //     return err;
  //   }
  // }

  // async function followUser(){
  //   try {
  //     const currentUser = await this.findOneUser();
  //     const toFollowUser = await this.models.User.findOne({where: {firstName: 'tom'}});
  //     currentUser.addUser(toFollowUser);
  //     return currentUser.getUser();
  //   } catch (err) {
  //     return err;
  //   }
  // }

  // router.post('/follow', async (req, res) => {
  //   try{
  //     const followedList = await userService.followUser();
  //     res.send(followedList);
  //   }catch(err){
  //     return next(err);
  //   }
  // });


  module.exports = router