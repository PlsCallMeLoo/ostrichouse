//jshint esversion:6sss
const mongoose = require('mongoose')


const recordSchema = new mongoose.Schema ({
  content: String,  
 
})

const Record = mongoose.model("Record", recordSchema)



exports.getRecords = async function() {

  const records = await Record.find({})
  return records
};


exports.setRecord = async function(content) {

  const record = new Record({
    content: content,
     
  })

  record.save()

  console.log(content + " saved")
};


exports.deleteRecord = async function(id) {


  await Record.deleteOne({_id:id})

  console.log(id + " deleted")
};
