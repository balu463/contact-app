var express=require("express");
var app=express();
var mongoose=require("mongoose");
var Contact=require("./models/contact");
var bodyParser=require("body-parser");
mongoose.connect("mongodb://localhost/contactlist",function(){
	console.log("sucsefull connected mongdb");
});


var PORT=process.env.PORT || 2000;
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.get("/contactList",function(req,res){

	Contact.getContacts(function(err,data){
		if(err){
			throw err;
		}
		res.json(data);
	})
})
app.post("/contactList",function(req,res){
	var body=req.body;//will fetch body details
	console.log(body);
	Contact.addContacts(body,function(err,data){
		if(err){
			throw err;
		}
		res.json(data);
	})
	
})

app.get("/contactList/:id",function(req,res){

	var id=req.params.id;
	Contact.getContactById(id,function(err,data){
		if(err){
			throw err;
		}
		console.log(data);
		res.json(data);
	});
}) 


app.put("/contactList/:id",function(req,res){
	var id=req.params.id;
	var body=req.body;
	console.log(body);
	Contact.updateContact(id,body,function(err,data){
		if(err){
			throw err;
		}
		res.json(data);
	})
	
	
})

app.delete("/contactList/:id",function(req,res){
var id=req.params.id;
	Contact.deleteContact(id,function(err,data){
		if(err){
			throw err;
		}
		res.json(data);
		
	});
}) 
app.listen(PORT,function(){

console.log("server is listening at port"+ PORT);

})