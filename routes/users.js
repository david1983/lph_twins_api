var express = require("express");
var router = express.Router();
var db = require("../libs/db");

// authorizer is a middleware that check if the user can access the endpoint
router.use( require("../libs/authorizer"));
router.use('/', require("./crudn"));



module.exports = router;