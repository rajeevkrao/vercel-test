const express = require("express");
const cors = require("cors");
const Mongo = require("./modules/db")
require('dotenv').config();

let mongo = new Mongo();

mongo.connect();

const app = express();

app.use(cors()); 
//Uncomment to allow cors for all routes


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))
app.use(express.static('dist'))

//Uncomment this section to Enable CORS
/* app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); */

app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/dist/index.html')
})

app.get('/api/getnums',async(req,res)=>{
    res.json(await mongo.getnums())
})

app.get('/test/*',(req,res)=>{
	res.sendFile(__dirname+"/test.html")
})

app.listen(5000)