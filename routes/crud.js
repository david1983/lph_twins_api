var express = require("express");
var router = express.Router();
var db = require("../libs/db");

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})


router.get('/:collection_name', (req, res)=>{
    db.query("select * from ??", [req.params.collection_name],(e,r)=>{
        if(e)return res.json({error: e})
        res.json(r)
    })
})

router.get('/:collection_name/:id', (req, res)=>{
    db.query("select * from ?? where id = ?", [req.params.collection_name, req.params.id], (e,r)=>{
        if(e)return res.json({error: e})
        res.json(r)
    })
})

router.post('/:collection_name',(req, res)=>{
    db.query("insert into ?? set ?", [req.params.collection_name, req.body], (e,r)=>{
        if(e)return res.json({error: e})
        res.json(r)
    })
})

router.put('/:collection_name/:id',(req, res)=>{
    db.query("update ?? set ? where id = ?", [req.params.collection_name, req.body, req.params.id], (e,r)=>{
        if(e)return res.json({error: e})
        res.json(r)
    })
})

router.delete('/:collection_name/:id',(req, res)=>{
    db.query("delete from ?? where id = ?", [req.params.collection_name, req.params.id], (e,r)=>{
        if(e)return res.json({error: e})
        res.json(r)
    })
})

module.exports = router