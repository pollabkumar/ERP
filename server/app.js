const express = require('express');
const app = express();
const port = 8080;
const passport = require('passport');
const path = require('path');
var morgan = require('morgan') 
var cors=require('cors');
app.use(cors({origin:true,credentials: true}));
//app.use(morgan('dev'))

app.use('/public',express.static('public')); 

app.use(function (req, res, next) { 
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', '*'); 
    res.setHeader('Access-Control-Allow-Credentials', true); 
    next();
});

app.use(passport.initialize());
require('dotenv').config({
    path: path.join(__dirname,'.env')
})
app.use('/users',require('./routes/users'));


 
app.listen(port,()=>{
    console.log(`App is listening at http://localhost:${port}`)
})