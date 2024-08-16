const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    headlines : String,
    content : String,
    date : String
     
})

module.exports = mongoose.model("news" , newsSchema) 