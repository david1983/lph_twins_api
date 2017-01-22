var jwt = require("jsonwebtoken");
var config = require("config");
var User = require("../models/user");

module.exports = function(req, res, next){
    
    if(req.header('Authorization')){
        jwt.verify(req.header('Authorization'), config.app.cipher_secret, function(err, decoded) {
            if(err || !decoded) return next() 
            var u = new User();
            u.getById(decoded.id).then((user)=>{
                req.user = user;
                next();
            }).catch((e)=>{res.json({error:e})});
        });
    }else{
        next()
    }    
}