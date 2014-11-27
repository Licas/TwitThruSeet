var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
	
router.post('/create',function(req,res){
        
     console.log("A post request " + JSON.stringify(req.body));
    res.end("Received: " + JSON.stringify(req.body));
    //res.sendStatus(200);
});

module.exports = router;