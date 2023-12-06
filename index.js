var express=require("express");
var cors=require("cors");

const productsRoute= require("./cloudshopdata");
const loginRoute=require("./userlogins");
//const imagesRoute=require("../../etcc/imagedata");

var app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 4003; // Use the provided PORT or default to 4003
// Determine the base URL based on the environment (local or Heroku)



app.use("/",productsRoute);
app.use("/",loginRoute);
//app.use("/",imagesRoute);




app.listen(PORT,()=>{
  console.log("server started at : "+ PORT);
})