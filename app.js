var express = require("express");
var config = require("config");
var app = express();

app.get('/', (req, res)=>{
    res.json({
        data: "the api is running fine"
    })
})

app.listen(config.app.port, ()=>{
    console.log( config.app.instanceName +  " is running on port " + config.app.port);
})