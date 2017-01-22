var db = require("../libs/db");
var jwt = require("jsonwebtoken");
var config = require("config");

module.exports = function(user){

    this.user = user;



    this.get= function(){
        var sql = "select * from tokens where user_id = ?";
        return db.queryP(sql,[this.user.id])
    }

    this.create = function(){    
        console.log(this.user);
        var user = this.user;    
        var data = {
            token: jwt.sign({id : user.id}, config.app.cipher_secret),
            user_id: this.user.id
        }
        var sql = "insert into tokens set ? ";
        return db.queryP(sql,[data]).then((r)=>{
            return Promise.resolve(data);
        })
    }

    this.update = function(){
        this.getToken().then((token)=>{

        })
    }
}