var express = require("express");
var router = express.Router();
var db = require("../libs/db");
var cipher = require("../libs/cipher");
var Token = require("../models/token");
var User = require("../models/user");
// authorizer is a middleware that check if the user can access the endpoint
router.use(require("../libs/authorizer"));




router.post('/login', (req, res) => {
    if (!req.body.password && !req.body.email) res.json({ error: 'no data provided' });
    var sql = "select * from users where email = ? and password = ?"
    db.query(sql, [req.body.email, cipher.cipher(req.body.password)], (e, r) => {
        if (e) return res.json({ error: e })
        if (r.length == 0) return res.json({ error: "User not found" })
        if (r.length > 1) return res.json({ error: "two users with the same email" })
        console.log(r)
        var user = r[0];
        var T = new Token(user);
    console.log(T)
        T.create()
            .then((r) => {
                res.json(r)
            }).catch((e)=>{
                res.json({error: e})
            })
    })
})

router.post('/logout', (req, res) => {
    if (!req.user) return res.json({ error: "user is already logged out" })
    var t = new Token(req.user);
    t.delete()
        .then((r) => {
            res.json(r);
        })
        .catch((e)=>{
            res.json({error: e})
        })

})

router.post('/register', (req, res) => {
    if (!req.body.password && !req.body.email) res.json({ error: 'no data provided' });
    req.body.password = cipher.cipher(req.body.password);
    var user = new User(req.body);
    user.create()
        .then((r) => {
            req.body.id = r.insertId;
            var T = new Token(req.body);            
            res.json(r);
        })
        .catch((e)=>{
            res.json({error: e})
        })
})

module.exports = router;