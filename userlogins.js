var express=require("express");
var cors=require("cors");
var mongoclient=require("mongodb").MongoClient;

var login= express.Router(); login.use(cors());



/*var connectionstring="mongodb+srv://swathi:database1@cluster0.aguofmt.mongodb.net/shopping1?retryWrites=true&w=majority";*/
var connectionstring = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/shopping1?retryWrites=true&w=majority`;


login.get("/userlogindetails",(req,res)=>{

    mongoclient.connect(connectionstring).then(clientObj=>{
        var database=clientObj.db("shopping1");
        database.collection("logindetails").find({}).toArray().then(result=>{
            res.send(result);
        });
    })
})

login.post("/Register",(req,res)=>{
    var userdata={
        "username":req.body.username,
        "mail":req.body.mail,
        "password":req.body.password,
        "mobile":req.body.mobile,
        "gender":req.body.gender
    };
    mongoclient.connect(connectionstring).then(clientObj=>{
        var database=clientObj.db("shopping1");
        database.collection("logindetails").insertOne(userdata).then(result=>{
            console.log("Registered succfully");
            
            console.log(userdata);
        })
    })
})

module.exports=login;