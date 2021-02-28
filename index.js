var express = require('express');
const passport= require('passport');
var router = express.Router();
const passportModel= require('./users');
const localStrategy = require('passport-local');
const { use } = require('../app');
const users = require('./users');
passport.use(new localStrategy(passportModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/registration',function(req,res){
  var newUser= new users({
    name:req.body.name,
    username:req.body.username
  })
  users.register(newUser,req.body.password)
  .then(function(u){
    const wlcmname=u.name;
    passport.authenticate('local')(req,res,function(){
    res.render('profilep',{data:wlcmname});
  })
})
  .catch(function(err){
    res.send(err);
  })
});
router.post('/login',passport.authenticate('local',{ 
  successRedirect:'profilep',
  failureRedirect:'/'
}),
function(req,res){});

router.get('/logout',function(req,res,next){
  req.logOut();
  res.render('logoutp');
});
router.get('/loginp',function(req,res){
  res.render('loginp');
});

router.get('/profilep',function(req,res){
  res.render('profilep',{data:req.body.username});
});



function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/');
  }
}

module.exports = router;
