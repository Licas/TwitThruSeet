
module.exports = function (app) {
	app.post('/multapp',function(req,res){
		console.log("Received post request. "+(req.body));
		
		res.send(JSON.stringify(req.body));
    });

    app.post('/',function(req,res){
		console.log("Received post request. ");
		
		res.send("Hello post");
    });

}