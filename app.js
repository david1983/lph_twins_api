var express = require("express");
var config = require("config");
var db = require("./libs/db");
var bodyParser = require('body-parser')
var app = express()
var cp = require("child_process");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.all('/update', (req, res)=>{
    res.end()
    setTimeout(function() {
        cp.execSync("cd /home/ubuntu/lhp_twins_api && git pull && npm install && pm2 restart API_0");        
    }, 1000);    
})
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