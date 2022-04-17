const express = require("express");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const authentication = require("./middlewares/baicAuth.js");
const bearerAuth = require("./middlewares/bearerAuth");
const { users } = require("./models/index.js");
// const isItOnline = require("./functions/isItOnline")
const http = require("http");
// const PORT = 3000;
const app = express();
app.use(express.static("./"));
app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.post("/", (req, res) => {
  var http = require("http");

  var options = req.body.domain;

  var request = http.request(options, function (req) {
    res.json({
      domain: options,
      domainstatus: "Site is Running (200)",
    });
  });
  request.on("error", function (err) {
    res.json({
      domain: options,
      domainstatus: "Site is not found (404)",
    });
  });

  request.end();
  // let url = req.body.domain;
  // let status = http.request(url, function (res) {
  //   if (res.statusCode == 200 || res.statusCode == 301) return true;
  //   else return false;
  // });
  // if (status) {
  //   res.json({
  //     domain: url,
  //     domainstatus: "Site is Running (200)",
  //   });
  // }
  // status.on("error", function (err) {
  //   res.json({
  //     domain: url,
  //     domainstatus: "Site is down (500)",
  //   });
  // });
  // status.end();
});
app.get("/", (req, res) => {
  res.render("webpulse", {
    title: "check if a website up or down by: the searchers",
  });
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 5);
    console.log(hashedPassword);
    const newUser = await users.create({
      username: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
  // res.render('register.ejs');
});
app.post("/login", authentication, (req, res) => {
  res.sendFile(__dirname + "/views/chat.html");
});
app.get("/support", bearerAuth, async (req, res) => {
  res.sendFile(__dirname + "/views/chat.html");
});
app.get("/logout", (req, res) => {
  res.clearCookie("jwt").render("webpulse.ejs");
});
// app.get("/", (req, res) => {
//   res.json("home page")
// })

function start(port) {
  app.listen(port, () => {
    console.log(`running on port ${port}`);
  });
}
module.exports = {
  app: app,
  start: start,
};
