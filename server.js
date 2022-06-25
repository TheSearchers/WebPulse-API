require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
// const morgan = require('morgan')
const authentication = require("./middlewares/baicAuth.js");
const bearerAuth = require("./middlewares/bearerAuth");
const { users } = require("./models/index.js");
const historyRouter = require('./routes/history')
var cors = require('cors');
// const isItOnline = require("./functions/isItOnline")

//socket.io instantiation
const http = require("http");
// const http = require("http").Server(express);
// const port = process.env.PORT;
const app = express();
app.use(cors())
// app.use(express.static("./"));
// app.use(express.static(__dirname + "/views"));
// app.use(express.static(__dirname + "/node_modules"));
app.set("view engine", "ejs");
// app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
// app.use(morgan("combined"))
app.use(historyRouter,bearerAuth);
let server = require("http").createServer(app);
let io = require("socket.io")(server, {cors: {origin: "*"}});
// morgan(function (tokens, req, res) {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms'
//   ].join(' ')
// })

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
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // res.redirect("/login");
    res.status(200).json(newUser);
  } catch {
    res.status(403);
    // res.redirect("/register");
  }
  // res.render('register.ejs');
});
app.post("/login", authentication, (req, res) => {
  // res.render("/views/chat.html");
  // res.redirect("/support");
  res.status(200).json(req.user.token)
  console.log("loggedin");
});

app.get("/support", bearerAuth, async (req, res) => {
  // res.render("chat.html");
  res.sendFile(__dirname + "/views/chat.html");
});

//listen on every connection
// io.on("connection", (socket) => {
//   console.log("New user connected");

//   //default username
//   socket.username = "unnamed";

//   //listen on change_username
//   socket.on("change_username", (data) => {
//     socket.username = data.username;
//   });

//   //listen on new_message
//   socket.on("new_message", (data) => {
//     //broadcast the new message
//     io.sockets.emit("new_message", {
//       message: data.message,
//       username: socket.username,
//     });
//   });
//   //listen on typing
//   socket.on("typing", (data) => {
//     socket.broadcast.emit("typing", { username: socket.username });
//   });
// });
// io.on('connection', socket => {
//   console.log(`${socket.id } connected `);
//   socket.on('message', ({ name, message }) => {
   
//     io.emit('message', { name, message })
//   })

//   socket.on("disconnect",()=>{
//     console.log(`${socket.id} disconnected `);
//   })
  // socket.on("typing", (data) => {
  //   socket.broadcast.emit("typing", { username: socket.username });
  // });
//})
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
