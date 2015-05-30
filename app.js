var express = require('express');
var app  = express();
var path = require("path"); 
 
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');  
var bodyParser   = require('body-parser');
app.use(bodyParser()); // get information from html forms

var dbConfig = require('./models/db.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

//var TaskList = require('./routes/tasklist');
var tl = require('./tasklist.js');

tl.mongoconnect('mongodb://localhost/tasklist_db')

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+ '/index.html'));
});

app.get('/product',function(req,res){
  res.sendFile(path.join(__dirname+'/product.html'));
});

app.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});

app.get('/our_team',function(req,res){
  console.log("Inside TEAM")
  res.sendFile(path.join(__dirname+'/our_team.html'));
});

app.get('/projectsubmit',function(req,res){
  res.sendFile(path.join(__dirname+'/projectsubmit.html'));
});

app.get('/test',function(req,res){
  res.sendFile(path.join(__dirname+'/test.html'));
});

app.get('/portfolio',function(req,res){
  res.sendFile(path.join(__dirname+'/portfolio.html'));
});

app.get('/login', function(req, res){
    res.sendFile(path.join(__dirname+'/login.html'));
 });
 
 
 app.get('/signup', function(req, res){
   // res.sendFile(path.join(__dirname+'/signup.html'));

  var user_name=req.body.user;
  var passwd=req.body.password;
  console.log("USRNAME = "+user_name+", PASSWORD is "+passwd);
  

          var mongoose = require('mongoose');
          var User = require('./models/user_model.js');

          mongoose.createConnection('mongodb://127.0.0.1/tasklist_db'); 
          var new_user = new User({
    							name:user_name,
    							email: user_name,
    							password: passwd,
    							phone: "",
    							_enabled:true
							});
		   new_user.save(function(err){
 				 if(err) console.log(err); 
		   });

         User.find(function (err, users) {
             if (err) return console.error(err);
            console.log(users)
            }) 
 });
 
 
 app.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
 });
 
 var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
 }

 app.post('/projectvalidate',function(req,res){
  console.log("Inside project validate");
  console.log(req.body);
 
  console.log("Title = "+req.body.heading+", Description is "+ req.body.projdescription + ", stage: "+req.body.stage);
  
          var mongoose = require('mongoose');
          var Proj = require('./models/proj.js');

          mongoose.createConnection('mongodb://127.0.0.1/my_db'); 
          var new_proj = new Proj({
    							title:req.body.heading,
    							description: req.body.projdescription,
    							stage: req.body.stage,
    						 });
		   new_proj.save(function(err){
 				 if(err) console.log(err); 
		   });

           Proj.find(function (err, projs) {
             if (err) return console.error(err);
             console.log(projs)
           }) 
 });

//  TASK Manipulation

 app.get('/addtask', function(req, res){
    res.sendFile(path.join(__dirname+'/addtask.html'));
 });

 app.get('/showtask', function(req, res){
    tl.showTasks(req,res);
 });

 app.post('/addtask',function(req, res){
    tl.addTask(req,res);
 });
 
 app.listen(5001);
 console.log("Running at Port 5001");