import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import config from '../config/database.js';
import { successMessage, errorMessage } from './successErrorResponseHelpers.js';

exports.signUp = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    admin: req.body.admin,
    numberOfLogins: 1
  });

  user.save(function(err) {
    if (err) {
      if (err.code == 11000) {
        errorMessage(res, "Incorrect password.");
      } else {
        errorMessage(res, "User login failed.");
      }
    } else {
      successMessage(res, "Your account " + req.body.username + " has been added to the system.");
    }
  });
}

require('dotenv').load();

exports.logIn = function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (!user) {
      errorMessage(res, "Authentication failed. User not found.");
    } else {
      user.verifyPassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          user.numberOfLogins = user.numberOfLogins + 1;
          user.save();
          var token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: parseInt(process.env.EXPIRATION_SECONDS)
          });
          res.send({ 
            "token": token, 
            user: {
              username: req.body.username,
              admin: user.admin,
              superUser: user.superUser
            }, 
            "url": process.env.ADDRESS, 
            "name": process.env.NAME
          });
        } else {
          errorMessage(res, "Authentication failed. Passwords did not match.");
        }
      });
    }
  });
}

exports.authenticate = function(req, res){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
  
      jwt.verify(token, process.env.SESSION_SECRET, function(err, decoded) {      
        if (err) {
          return errorMessage(res, 'Failed to authenticate token.');    
        } else {
          res.send({ "message": 'Authenticated succesfully', "url": process.env.ADDRESS, "name": process.env.NAME });
        }
      });
  
    } else {
      return errorMessage(res, 'No token provided.');
    }
}

exports.logOut = function(req, res){
  console.log(req.jwt);
  req.logout();
  successMessage(res, "You have logged out.");
}

exports.setUpDb = function(){
  var user = new User({
    username: "dejavu",
    password: "deloitte123",
    admin: false,
    superUser: false
  });
  user.save();

  var admin = new User({
    username: "admin",
    password: "admin123",
    admin: true,
    superUser: true
  });
  admin.save();

  var superUser = new User({
    username: "superUser",
    password: "admin123",
    admin: false,
    superUser: true
  });
  superUser.save();
}

exports.getUsers = function() {
  
}