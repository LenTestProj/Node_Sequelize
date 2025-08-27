const express=  require("express");
const bodyParser = require("body-parser");
const userCtrl = require("./controllers/userController");
const cors = require('cors');

const app = express();
require("./models");

//CORS
app.use(cors())

//parse application json
app.use(bodyParser.json())

app.get("/", function(req,res){
    res.send("Hello world")
})

app.get("/users", userCtrl.getUsers);

app.get("/users/:id",userCtrl.getUser)

app.post("/user", userCtrl.postUser);

app.post("/users", userCtrl.postUsers);

app.delete("/user/:id", userCtrl.deleteUser);

app.patch("/user/:id", userCtrl.patchUser);

app.get("/query", userCtrl.queryUser)

app.get("/finders", userCtrl.findersUsers);

app.get("/get-set-virtual", userCtrl.getSetVirtual)

app.get("/validate", userCtrl.validateUser);

app.get("/raw-queries", userCtrl.rawQueries)

app.get("/one-to-one", userCtrl.oneToOneUser)

app.get("/one-to-many", userCtrl.oneToManyUser);

app.get("/many-to-many", userCtrl.manyToManyUser)

app.get("/paranoid", userCtrl.paranoidUser)

app.get("/loading", userCtrl.loadingUser)

app.get("/eager", userCtrl.eagerUser)

app.get("/creator", userCtrl.creatorUser)

app.get("/m-n-associations", userCtrl.mnAssociationsUser);

app.get("/m-n-assocations-two", userCtrl.mnAssociationsUser2);

app.get("/many-to-many-to-many", userCtrl.m2m2mUser);

app.get("/transactionsUser", userCtrl.transactionsUser);

app.get("/withTransactionsUser", userCtrl.withTransactionsUser)

app.get("/scopesUser", userCtrl.scopesUser);

app.get("/hooks", userCtrl.hooksUser);

app.get("/polyOneToMany", userCtrl.polyOneToMany);

app.get('/polyManyToMany', userCtrl.polyManyToMany)

app.get("/query-interface",userCtrl.queryInterfaceusers);

app.get("*",(req,res,next)=>{
    res.status(404).send("Not found")
});

//temp
// User.sync({force:true});
// Contact.sync({force:true})
// sequelize.sync({force:true})

app.listen(4000,()=>{
    console.log("Server listening on port 4000")
})