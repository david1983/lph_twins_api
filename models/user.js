var db = require("../libs/db");

module.exports = function(user){
    this.user = user;
    this.getById = (id)=>{
        var sql = "select * from users where id = ?"
        return db.queryP(sql, [id]).then((r)=>{            
            if(r.length>1) return Promise.reject("Two users with same ID")
            return Promise.resolve(r[0])
        });
    }

    this.get = ()=>{
        return this.user;
    }

    this.create = ()=>{        
        var sql = "insert into users set ?"
        return db.queryP(sql, [this.user]);
    }

    this.delete = ()=>{
        var sql = "delete from users where id = ?"
        return db.queryP(sql, [this.user.id]);
    }

    this.update =  (data) =>{
        var sql = "update users set ? where id = ?";
        return db.queryP(sql, [data, this.user.id]).then((r)=>{                        
            console.log(r)
            // this.user = Object.assign(this.user, req.body);
            return this.getById(this.user.id)
        })
    }
}