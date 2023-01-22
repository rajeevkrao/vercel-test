const express = require("express");
const cors = require("cors");

const app = express();

//app.use(cors()); 
//Uncomment to allow cors for all routes

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

//Uncomment this section to Enable CORS
/* app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); */

app.get('/',(req,res)=>{
	res.send("Hello")
})

app.get('/test/*',(req,res)=>{
	res.sendFile(__dirname+"/test.html")
})

app.listen(5000)