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

    if (req.headers.cookie) {
        const tokenInCookie = req.headers.cookie;

        let keyValueSplit = tokenInCookie.split('=');
        let token = keyValueSplit.pop()
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