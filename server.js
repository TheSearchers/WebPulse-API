require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");

const authentication = require("./middlewares/baicAuth.js");
const bearerAuth = require("./middlewares/bearerAuth");
const { users } = require("./models/index.js");
const historyRouter = require('./routes/history')
const workSpaceRouter = require('./routes/workspace')
const usersRouter = require('./routes/users')
var cors = require('cors');

const http = require("http");
const app = express();
app.use(cors())
app.set("view engine", "ejs");
app.use(bodyparser.json());
app.use(historyRouter);
app.use(workSpaceRouter);
app.use(usersRouter);



let server = require("http").createServer(app);
let io = require("socket.io")(server, {cors: {origin: "*"}});
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
});
app.get("/", (req, res) => {
  // res.render("webpulse", {
  //   title: "check if a website up or down by: the searchers",
  // });
  res.send("home page")
});
// app.get("/login", (req, res) => {
//   res.render("login.ejs");
// });
// app.get("/register", (req, res) => {
//   res.render("register.ejs");
// });
app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 5);
    console.log(hashedPassword);
    const newUser = await users.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(200).json(newUser);
  } catch {
    res.status(403);
  }
});
app.post("/login", authentication, (req, res) => {
  res.status(200).json(req.user)
  console.log("loggedin");
});

// app.get("/support", bearerAuth, async (req, res) => {
//   res.sendFile(__dirname + "/views/chat.html");
// });


//----------------------------
//chat 
io.use((socket, next) => {
  const username = socket.handshake.auth.fetched_userName;
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
      key: id,
    });
  }
  socket.emit("users", users);
  console.log(users);

  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
    key: socket.id,
    self: false,
  });

  socket.on("private message", ({ content, to }) => {
    console.log("Content:", content, " To:", to);
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    });
  });
});
//---------------
app.get("/logout", (req, res) => {
  res.clearCookie("jwt").render("webpulse.ejs");
});


function start(port) {
  server.listen(port, () => {
    console.log(`running on port ${port}`);
  });
}

module.exports = {
  app: app,
  start: start,
};
