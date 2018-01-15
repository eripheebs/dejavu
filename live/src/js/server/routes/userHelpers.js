import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import config from '../config/database.js';
import { successMessage, errorMessage } from './successErrorResponseHelpers.js';

exports.signUp = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    admin: req.body.admin,
    lock: false
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
          var loggedInUser = new LoggedInUser({
            username: req.body.username,
            createdAt: new Date
          });
          loggedInUser.save();
          var token = jwt.sign(user, config.secret, {
            expiresIn: parseInt(process.env.EXPIRATION_SECONDS)
          });
          successMessage(res, "JWT " + token);
        } else {
          errorMessage(res, "Authentication failed. Passwords did not match.");
        }
      });
    }
  });
}

exports.logOut = function(req, res){
  LoggedInUser.findOneAndRemove({
    username: req.user.username
  }, function(err, user) {
    if (err) {
      errorMessage(res, err);
    }
    if (!user) {
      errorMessage(res, "You are not logged in.");
    } else {
      successMessage(res, "You have logged out.");
    }
  });
}

exports.setUpDb = function(){
  var user = new User({
    username: "dejavu",
    password: "deloitte123",
    admin: false
  });
  user.save();

  var admin = new User({
    username: "admin",
    password: "admin123",
    admin: true
  });
  admin.save();
}
