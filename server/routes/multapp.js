var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
	
router.post('/create',urlencodedParser,function(req,res){
        
    console.log("Post request:"+req.body.id);
});

module.exports = router;