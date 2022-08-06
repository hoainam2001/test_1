require('dotenv').config()
const express = require('express')
const userRoute = require('./routes/user')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

switch(process.env.NODE_ENV){
    case 'product':
        // for product
        mongoose.connect(process.env.mongo_product)
        break
    case 'development':
        mongoose.connect(process.env.mongo_development)
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use('/user', userRoute)

let port = process.env.PORT

app.listen(port, () => console.log("listenning at port " + port))