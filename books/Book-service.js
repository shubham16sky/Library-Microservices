const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.json());

const Book = require("./Book")


mongoose.connect("mongodb://0.0.0.0:27017/booksservice")
.then(()=>console.log("Book-service database connected"))
.catch(e=>console.log(e));


PORT = 4545;



app.get("/",(req,res)=>{

    res.send("This is the books service");

})

//Create endpoint
app.post("/book",(req,res)=>{
    //This is create function 
    const {title,author,numberPages,publisher} = req.body;
    const newBook = new Book({
        title,author,numberPages,publisher
    });
    newBook.save().then(()=>
    {
        console.log("New book added to db")
    }).catch(err=>{
        console.log(err);
    });

    //console.log(newBook)
    return res.json(newBook)

    
})


app.get("/books",(req,res)=>{
    Book.find().then((books)=>{
        console.log(books);
        res.json(books)
    }).catch(err=>{
        console.log(err)
    })
});



app.get("/book/:id",(req,res)=>
{
    Book.findById(req.params.id)
    .then((book)=>{
        console.log(book)
        if (book){
            res.json(book);

        }else{
            res.sendStatus(404);
        }
    })
    .catch(err=>{
        console.log(err);
    });
    
})

app.delete("/book/:id",(req,res)=>{
    Book.findByIdAndRemove(req.params.id)
    .then((book)=>{
        if (book){
            res.json("Book deleted successfully");
            console.log("Book deleted successfuly");

        }else{
            res.json("Book with given id is not present");
            console.log("Book with given id is not present");
        }
        
    }).catch(err=>{
        console.log(err);
    })
})







app.listen(PORT,()=>{
    console.log(`Book service is running on ${PORT}`);
    
});