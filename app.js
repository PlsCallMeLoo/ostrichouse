//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongo = require(__dirname + "/mongo.js");

const mongoose = require('mongoose')
require("dotenv/config");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];
const uri = `mongodb+srv://plscallmeloo:${process.env.MONGO_PASS}@plscallmeloo.5sxeq9g.mongodb.net/${process.env.MONGO_DB_NAME}`

async function connectmongo()
{
   try {
    await mongoose.connect(uri)
   } catch (error) { 
     handleError(error);
   }
}





app.get("/", async function(req, res) {
 
  connectmongo()
  const records = await mongo.getRecords()
  const recordsWithOnlyContent = await records.map((objeto) =>  objeto.content);
  const records2 = await mongo.getRecords()
  const re = new RegExp("/[0-9]/");

  const idss = await records2.map((objeto) =>  objeto._id);

 


  const day = date.getDate();

  
    res.render("list", {listTitle: day, newListItems: recordsWithOnlyContent, id:idss});

  




});

app.post("/", async function(req, res){


  const item = req.body.newItem;

  if (req.body.list === "Work") {
    mongo.setRecord(item)
    res.redirect("/work");
  } else {
    await mongo.setRecord(item)

    setTimeout((() => {
      res.redirect("/");
    }), 100)
  }
});




app.post("/deleteRecord",  function(req, res){

  const id =  req.body.id
  mongo.deleteRecord(id)
  res.send(200)
 

  





});



app.get("/about", function(req, res){
  res.sendStatus(200);
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
