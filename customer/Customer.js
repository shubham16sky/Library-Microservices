const mongoose = require("mongoose")

const CustomerSchema = new mongoose.Schema({
    name:{
        type : String,
        require : true
    },
    age:{
        type : Number,
        require: true
    },
    address:{
        type : String,
        require: true
    }
});

module.exports = mongoose.model("Customer",CustomerSchema);