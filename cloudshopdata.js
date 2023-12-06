var express=require("express");
var cors=require("cors");
var router=express.Router();
var mongoclient=require("mongodb").MongoClient;

require('dotenv').config();

//var connectionstring="mongodb+srv://swathi:database1@cluster0.aguofmt.mongodb.net/shopping1?retryWrites=true&w=majority";
var connectionstring = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/shopping1?retryWrites=true&w=majority`;


//var app=express();
//app.use(express.urlencoded({extended:true}));
//app.use(express.json());
//app.use(cors());

router.get("/",(req,res)=>{
    mongoclient.connect(connectionstring).then((err)=>{
        if(err){
            console.log(err);
        }
        else
        console.log("successfully connected to Mongodb cloud");
        res.send("<h1>Testing</h1>");
    })
})

router.get("/all",(req,res)=>{
    mongoclient.connect(connectionstring).then((clientObj)=>{
        var database=clientObj.db("shopping1");
        database.collection("cloths").find({}).toArray().then(doc=>{
            res.send(doc);
        })
    })

})

router.get("/kids",(req,res)=>{
    mongoclient.connect(connectionstring).then((clientObj)=>{
       
        var database=clientObj.db("shopping1");
        database.collection("cloths").find({category:"kids"}).toArray().then(doc=>{
            res.send(doc);
        })
    })
})

router.get("/women",(req,res)=>{
    mongoclient.connect(connectionstring).then(clientObj=>{
        var database=clientObj.db("shopping1");
        database.collection("cloths").find({category:"women"}).toArray().then(doc=>{
            res.send(doc);
        })
    })
})

router.get("/men",(req,res)=>{
    mongoclient.connect(connectionstring).then(clientObj=>{
        var database=clientObj.db("shopping1");
        database.collection("cloths").find({category:"men"}).toArray().then(doc=>{
            res.send(doc);
        })
    })
})

router.get("/products/:id",(req,res)=>{
    var id=parseInt(req.params.id);
    mongoclient.connect(connectionstring).then(clientObj=>{
        var database=clientObj.db("shopping1");
        database.collection("cloths").find({id:id}).toArray().then(doc=>{
            res.send(doc);
        })
    })
})


router.post("/addproducts",(req,res)=>{

    var item={
        "id":parseInt(req.body.id),
        "name":req.body.name,
        "price":parseFloat(req.body.price),
        "image":req.body.image,
        "category":req.body.category
    };
    mongoclient.connect(connectionstring).then(clientObj=>{
        var database=clientObj.db("shopping1");
        database.collection("cloths").insertOne(item).then((result)=>{
            console.log("record inserted");
            res.redirect("/all");
        })
    })
});

router.post("/addmanyproducts",(req,res)=>{
    var item={
        "id":parseInt(req.body.id),
        "name":req.body.name,
        "price":parseFloat(req.body.price),
        "image":req.body.image,
        "category":req.body.category
    };
    var items=[item];
    mongoclient.connect(connectionstring).then(clientObj=>{
        var database=clientObj.db("shopping1");
        database.collection("cloths").insertMany(items).then((result)=>{
            console.log("records inserted");
            res.redirect("/all");
        })
    })
})

router.put("/modifyproducts/:id",(req,res)=>{
    var pid= parseInt(req.params.id);
    var product={
        "id":parseInt(req.body.id),
        "name":req.body.name,
        "price":parseFloat(req.body.price),
        "image":req.body.image,
        "category":req.body.category
    };
    mongoclient.connect(connectionstring).then(clientObj=>{
        var database=clientObj.db("shopping1");
        database.collection("cloths").updateOne({id:pid},{$set:product}).then(result=>{
            console.log("product modified");
            res.redirect('/all');
        })
    })
})

router.patch("/updateproducts/:id",(req,res)=>{
    var pid=parseInt(req.params.id);
    var product={
        "id":parseInt(req.body.id),
        "name":req.body.name,
        "price":parseFloat(req.body.price),
        "image":req.body.image,
        "category":req.body.category
    }
    mongoclient.connect(connectionstring).then(clientObj=>{
        var database=clientObj.db("shopping1");
        database.collection("cloths").updateOne({id:pid},{$set:product}).then(result=>{
            console.log("product updated");
            res.redirect("/all");
        })
    })
})

router.delete("/deleteproducts/:id",(req,res)=>{
    var pid=parseInt(req.params.id);
    mongoclient.connect(connectionstring).then(clientObj=>{
        var database=clientObj.db("shopping1");
        database.collection("cloths").deleteOne({id:pid}).then(result=>{
            console.log("product deleted");
            res.redirect("/all");
        })
    })
})

module.exports = router;

//app.listen(4003,()=>{
  //  console.log("server started at : 4003 ");
//})