const express=  require("express");
const bodyParser = require("body-parser");
const User = require("./models/user(alternate)");
const app = express();
require("./models");

//parse application json
app.use(bodyParser.json())

app.get("/", function(req,res){
    res.send("Hello world")
})

//temp
User.sync();

app.listen(6000,()=>{
    console.log("Server listening on port 6000")
})