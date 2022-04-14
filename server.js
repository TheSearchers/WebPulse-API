const express = require("express")
const bodyparser = require("body-parser");
const bcrypt = require('bcrypt')
const authentication = require('./middlewares/baicAuth.js');
const bearerAuth = require('./middlewares/bearerAuth');
const { users } = require('./models/index.js');
// const isItOnline = require("./functions/isItOnline")
const http = require("http")
// const PORT = 3000;
const app = express();
app.use(express.static('./'));
app.use(express.static(__dirname + '/views'));
app.set("view engine", "ejs")
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.post("/", async (req, res) => {
  try {
    let url = req.body.domain;
   let status =  http.get(url, function(res){
      if( res.statusCode == 200 || res.statusCode == 301 )
    return true
   else
    return false
     });
        if(status){
           res.json({
            domain: url,
            domainstatus:"Site is Running (200)",
          });
        }
  } catch  {
    res.json({  
     domain: url,
     domainstatus:"Site is Down (500)",
   });
  }    
});
app.get("/", (req, res) => {
  res.render("webpulse", { title: "check if a website up or down by: the searchers" });
});
app.get("/login", (req, res) => {
  res.render('login.ejs');
})
app.get("/register", (req, res) => {
  res.render('register.ejs');
})
app.post("/register", async (req, res) => {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password,5);
      console.log(hashedPassword);
      const newUser = await users.create({
          username: req.body.name,
          email:req.body.email,
          password: hashedPassword
      })
      res.redirect('/login');
  } catch {
      res.redirect('/register');
  }
  // res.render('register.ejs');
})
app.post('/login',authentication,(req,res)=>{
  res.sendFile(__dirname + "/views/chat.html"); 
})
app.get("/support",bearerAuth,async (req, res) => {
  res.sendFile(__dirname + "/views/chat.html");
})
app.get('/logout', (req, res) => {
  res.clearCookie('jwt').render('webpulse.ejs');
  
 });
// app.get("/", (req, res) => {
//   res.json("home page")
// })

function start(port) {
  app.listen(port,()=>{
      console.log(`running on port ${port}`)
  })
}
module.exports = {
  app: app,
  start: start
}