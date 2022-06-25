'use strict';


var express = require('express')
var cookieParser = require('cookie-parser')
var app = express()
const base64 = require('base-64');
app.use(cookieParser())
const bcrypt = require('bcrypt');
require('dotenv').config();
var jwt = require('jsonwebtoken');
const { users } = require('../models/index');
const SECRET = process.env.SECRET || "test";
const authentication = async (req, res, next) => {
    try {
        if (req.headers['authorization']) {
            let basicHeaderParts= req.headers.authorization.split(' ');
            console.log(basicHeaderParts);
            let encodedPart = basicHeaderParts.pop();
            console.log(encodedPart);
            let decoded = base64.decode(encodedPart);
            console.log(decoded);
            let [username,password]= decoded.split(':');
            console.log();
            const user = await users.findOne({ where: { email: username } });
            const valid = await bcrypt.compare(password, user.password);
            if (valid) {
                req.user = user;
                let newToken = jwt.sign({ username: user.username }, SECRET, { expiresIn: 900000 });
                // res.cookie("jwt", newToken, {
                //     httpOnly: true
                // });
                user.token = newToken;
                next();
            } else {
                res.send('invalid login Password')
                next(`input is invalid`);
            }
        }
    } catch {
        res.send('invalid login Username')
    }
}

module.exports = authentication;