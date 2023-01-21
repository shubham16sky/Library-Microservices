const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    CustomerID : {
        type : mongoose.SchemaTypes.ObjectId,
        require: true
    },
    BookID : {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    InitialDate : {
        type: Date,
        require: true
    },
    DeliveryDate: {
        type: Date,
        require: true
    }
});

module.exports = mongoose.model("Order",OrderSchema);