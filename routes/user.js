var express = require("express");
var router = express.Router();
var db = require("../libs/db");
var cipher = require("../libs/cipher");
// authorizer is a middleware that check if the user can access the endpoint
router.use( require("../libs/authorizer"));

router.post('/login', (req, res)=>{
    if(!req.body.password && !req.body.email) res.json({error: 'no data provided'});
    var sql = "select * from users where email = ? and password = ?"
    db.query(sql, [req.body.email , cipher.decipher(req.body.password)], (e,r)=>{
        if(e) return res.json({error: e})
        res.json(r)
    })
})

router.post('/logout', (req, res)=>{
    
})

router.post('/register', (req, res)=>{

})





module.exports = router;