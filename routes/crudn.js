var express = require("express");
var router = express.Router();
var db = require("../libs/db");

router.get('/', (req, res)=>{
    db.query("select * from ??", [req.params.collection_name],(e,r)=>{
        if(e)return res.json({error: e})
        res.json(r)
    })
})

router.get('/:id', (req, res)=>{
    db.query("select * from ?? where id = ?", [req.params.collection_name, req.params.id], (e,r)=>{
        if(e)return res.json({error: e})
        res.json(r)
    })
})

router.post('/',(req, res)=>{
    db.query("insert into ?? set ?", [req.params.collection_name, req.body], (e,r)=>{
        if(e)return res.json({error: e})
        res.json(r)
    })
})

router.put('/:id',(req, res)=>{
    db.query("update ?? set ? where id = ?", [req.params.collection_name, req.body, req.params.id], (e,r)=>{
        if(e)return res.json({error: e})
        res.json(r)
    })
})

router.delete('/:id',(req, res)=>{
    db.query("delete from ?? where id = ?", [req.params.collection_name, req.params.id], (e,r)=>{
        if(e)return res.json({error: e})
        res.json(r)
    })
})

module.exports = router;