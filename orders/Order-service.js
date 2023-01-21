const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const app = express()
const axios = require("axios")
app.use(bodyParser.json())

//Importing Order model
const Order = require("./Order")
//Defining port for the service
PORT = 4747;

//Connecting to mongoDB database
mongoose.connect("mongodb://0.0.0.0:27017/orderservice")
.then(()=>console.log("Order-service database connected"))
.catch(e=>console.log(e));




//Route to create order
app.post("/order",(req,res)=>{
    var {CustomerID,BookID,InitialDate,DeliveryDate} = req.body;
    CustomerID = mongoose.Types.ObjectId(CustomerID);
    BookID = mongoose.Types.ObjectId(BookID)

    var newOrder = new Order({
        CustomerID,BookID,InitialDate,DeliveryDate
    });

    newOrder.save()
    .then((order)=>{
        if(order){
            console.log("Order created successfully");
            res.status(200).send("Order created successfully");
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(400).send("Internal Server Error")
    })


})

//get all orders 
app.get("/order",(req,res)=>{
    Order.find().then((books)=>{
        
    res.set(200).send(books);
    
        
        
    })
    .catch(err=>{
        console.log(err);
        res.set(500).send("Internal server error");
    })

});


//Get order by id 
app.get("/order/:id",(req,res)=>{
    Order.findById(req.params.id)
    .then((order)=>{
        if(order){
            //Do something
            axios.get("http://localhost:4646/customer/"+order.CustomerID)
            .then((response)=>{
                var orderDetail = {customerName: response.data.name,bookTitle:""}

                axios.get("http://localhost:4545/book/"+order.BookID)
                .then((resp)=>{
                    orderDetail.bookTitle = resp.data.title;
                    res.json(orderDetail)
                })

            })


            console.log("WORKING")


        }else{
            //Do something else 
            res.send("Invalid order")
        }
    })
})


//Starting the service
app.listen(PORT,()=>{
    console.log(`ORDER SERVICE RUNNING ON ${PORT}`)
})






