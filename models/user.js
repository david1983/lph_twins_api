var db = require("../libs/db");
const schema = ["id", "email", "first_name", "last_name", 'dob', 'address', 'town', 'country', 'phone', 'role']

module.exports = function(user){
    if(user)
        this.user = schema.reduce((a,i)=>{
            a[i] = user[i]
            return a;
        },{});
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

    this.update =  () =>{
        var sql = "update users set ? where id = ?";
        return db.queryP(sql, [this.user, this.user.id]).then((r)=>{
            console.log(r)
            // this.user = Object.assign(this.user, req.body);
            return this.getById(this.user.id)
        })
    }
}