var express = require('express');
var router = express.Router();
const mongoose= require('mongoose');
const plm = require('passport-local-mongoose');
mongoose.connect('mongodb://localhost/Passportprc',{ useNewUrlParser: true },{ useUnifiedTopology: true });
const passportModel = mongoose.Schema ({
  name:String,
  username: String,
  password: String
});

passportModel.plugin(plm);


module.exports = mongoose.model('user',passportModel);
