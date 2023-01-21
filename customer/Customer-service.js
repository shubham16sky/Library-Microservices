const express = require("express");
const mongoose = require("mongoose");

const BodyParser = require("body-parser");
const bodyParser = require("body-parser");
const Customer = require("./Customer")



const app = express();
app.use(BodyParser.json())

PORT = 4646;

mongoose.connect("mongodb://0.0.0.0:27017/customerservice")
.then(()=>console.log("Customer-service database connected"))
.catch(e=>console.log(e));


//Registering customer
app.post("/customer",(req,res)=>{
    const {name,age,address} = req.body;
    if (!(name&&age&&address)){
        res.sendStatus(500);
        console.log("Body attributes not sufficient");
    }else{
        newCustomer = new Customer({
            name,age,address
        })
        newCustomer.save()
        .then(()=>{
            console.log("Customer saved successfully");
            res.json("customer saved successfully");
    
    
        })
        .catch(err=>{
            console.log(err);
            res.sendStatus(500);
        })
    }
    

});

//Get customer 
app.get("/customer",(req,res)=>{
    Customer.find().then((customers)=>{
        if (customers){
            
            res.json(customers);
        }else{
            console.log("No customer present");
            res.json("No customer present");
        }
        
    }).catch(err=>{
        res.sendStatus(500);
    })
});

//get customer by id 


app.get("/customer/:id",(req,res)=>{
    Customer.findById(req.params.id)
    .then((customer)=>{
        if (customer){
            console.log(customer)
            res.json(customer);
        }else{
            console.log("Customer with given id is not present");
            res.sendStatus(404);
        }
    })
    .catch(err=>{
        console.log("ERROR")
        res.sendStatus(500);
    })
});

//Delete a customer 

app.delete("/customer/:id",(req,res)=>{
    Customer.findByIdAndRemove(req.params.id)
    .then((customer)=>{
        if (customer){
            console.log("Customer deleted suceesfully");
            res.status(200).send("Customer deleted successfully");
        }else{
            console.log("Customer with given id is not found");
            res.status(404).send("Customer with given id not found");
        }
    })
    .catch(err=>{
        console.log(err);
        res.set(500).send("Internal server error");
    })
})

app.listen(PORT,()=>{
    console.log(`Customer service is running on port ${PORT}`);
})







