var db = require("../libs/db");
var moment = require("moment")
const schema = ["id", "email", "password", "first_name", "last_name", 'dob', 'address', 'town', 'country', 'phone', 'role']

module.exports = function(user){
    if(user)
        this.user = schema.reduce((a,i)=>{
            a[i] = user[i]
            if(user.dob) user.dob = moment(user.dob).format("YYYY-MM-DD")
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
        var u = this.user;
        delete u.password;
        var sql = "update users set ? where id = ?";
        return db.queryP(sql, [u, this.user.id]).then((r)=>{
            console.log(r)
            // this.user = Object.assign(this.user, req.body);
            return this.getById(this.user.id)
        })
    }
}