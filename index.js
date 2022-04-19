const express = require("express")
const bodyparser = require("body-parser");
// const isItOnline = require("./functions/isItOnline")
const http = require("http")
const PORT = 3000;
const app = express();
app.set("view engine", "ejs")
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.post("/webpulse", async (req, res) => {
  let url = req.body.domain;
 let status = await  http.get(url, function(res){
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
      else{  
         res.json({  
          domain: url,
          domainstatus:"Site is Down (500)",
        });
      }
});
app.get("/webpulse", (req, res) => {
  res.render("webpulse", { title: "check if a website up or down by: the searchers" });
});
app.get("/", (req, res) => {
  res.send("home page")
})
app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});

