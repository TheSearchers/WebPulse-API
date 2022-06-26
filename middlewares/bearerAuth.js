'use strict';

require('dotenv').config();
var express = require('express')
var cookieParser = require('cookie-parser')
var app = express()
app.use(cookieParser())
const SECRET = process.env.SECRET || "test";
const jwt = require('jsonwebtoken');

const { users } = require('../models/index');
require("./baicAuth");
const bearerAuth = async (req, res, next) => {
console.log(req.headers.authorization);
    if (req.headers.authorization) {
        // const tokenInCookie = req.headers.cookie;

        // let keyValueSplit = tokenInCookie.split('=');
        // let token = keyValueSplit.pop()
        let bearerHeadersParts = req.headers.authorization.split(' ');
        let token = bearerHeadersParts.pop();
        try {
            if (token) {
                const userToken = jwt.verify(token, SECRET);
                const user = await users.findOne({ where: { username: userToken.username } });
                if (user) {
                    req.user = user;
                    req.token = userToken;
                    next();
                } else {
                    res.status(403).send('invalid user')
                }
            }
        } catch (error) {
            res.status(403).send('invalid Token');
        }
    } else {
        res.redirect('/register');
    }
}
module.exports = bearerAuth;