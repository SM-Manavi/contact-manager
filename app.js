// const http = require('http');

// const server = http.createServer((req, res)=>{
//     if(req.method = "GET"){
//         res.setHeader('Content-Type', 'text/html');
//         res.write("<h1> Hello Wrold! </h1>");
//         res.end();
//     }
// });

// server.listen(3000, ()=>{
//     console.log("Server has created.")
// })

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public/"));
app.use(session({
  secret : "djaldsaafaeljdsfhlgjksdjkfesef",
  resave : false,
  saveUninitialized : false,
  store : new MongoStore({mongooseConnection : mongoose.connection}), 
}));

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  // res.setHeader("Access-Control-Allow-")\
  next();
})

app.get('/', (req, res, next)=>{
  res.render('index');
});

const auth = require('./routes/auth');
app.use(auth);

const contacts = require('./routes/contacts');
app.use('/contacts', contacts);

app.use((error, req, res, next)=>{
  res.status(404).send("<h1> Not Found </h1>");
  res.status(404).send("<h1> Not Found </h1>");
})

// app.listen(3000, () => {
//   console.log("Server has started.");
// });

const { connectToMongoDB } = require("./utils/database");
connectToMongoDB().then(res=>{
    app.listen(3000, ()=>{
        console.log('Server has started.');
    });
});
