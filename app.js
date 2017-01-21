var express = require("express");
var config = require("config");
var db = require("./libs/db");
var bodyParser = require('body-parser')
var app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use('/api', require("./routes/crud"))
app.get('/', (req, res)=>{
    console.log('root /')    
    res.json({
        data: "the api is running fine"
    })
})

app.listen(config.app.port, ()=>{
    console.log( config.app.instanceName +  " is running on port " + config.app.port);
})