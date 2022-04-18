require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const authentication = require("./middlewares/baicAuth.js");
const bearerAuth = require("./middlewares/bearerAuth");
const { users } = require("./models/index.js");
// const isItOnline = require("./functions/isItOnline")

//socket.io instantiation
const http = require("http");
// const http = require("http").Server(express);
// const port = process.env.PORT;
const app = express();
app.use(express.static("./"));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/node_modules"));
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

let server = require("http").createServer(app);

let io = require("socket.io")(server);

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
  // res.render("/views/chat.html");
  res.redirect("/support");
});

app.get("/support", bearerAuth, async (req, res) => {
  // res.render("chat.html");
  res.sendFile(__dirname + "/views/chat.html");
});

//listen on every connection
io.on("connection", (socket) => {
  console.log("New user connected");

  //default username
  socket.username = "unnamed";

  //listen on change_username
  socket.on("change_username", (data) => {
    socket.username = data.username;
  });

  //listen on new_message
  socket.on("new_message", (data) => {
    //broadcast the new message
    io.sockets.emit("new_message", {
      message: data.message,
      username: socket.username,
    });
  });

  //listen on typing
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", { username: socket.username });
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("jwt").render("webpulse.ejs");
});
// app.get("/", (req, res) => {
//   res.json("home page")
// })

function start(port) {
  server.listen(port, () => {
    console.log(`running on port ${port}`);
  });
}

module.exports = {
  app: app,
  start: start,
};