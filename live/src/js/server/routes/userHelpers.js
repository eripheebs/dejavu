import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import config from '../config/database.js';
import moment from 'moment';
import { successMessage, errorMessage } from './successErrorResponseHelpers.js';

exports.signUp = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    admin: req.body.admin,
    superUser: req.body.superUser,
    numberOfLogins: 1,
    lastLogin: moment().format('MMM D, YYYY, H:ss'),
    blocked: false
  });

  user.save(function(err) {
    if (err) {
      console.log(err.message);
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

exports.changePassword = function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (!user) {
      errorMessage(res, "Authentication failed. User not found.");
    } else {
      user.password = req.body.password;
      user.save();
      successMessage(res, "Password succesfully changed");
    }
  });
}

exports.changeSuperUser = function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (!user) {
      errorMessage(res, "Authentication failed. User not found.");
    } else {
      user.superUser = !user.superUser;
      user.save();
      successMessage(res, "Super user rights changed.");
    }
  });
}

exports.changeAdmin = function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (!user) {
      errorMessage(res, "Authentication failed. User not found.");
    } else {
      user.admin = !user.admin;
      user.save();
      successMessage(res, "Admin rights changed.");
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
    } else if (user.blocked) {
      errorMessage(res, "Your account has been temporarily suspended. Please speak to the admin for further details.")
    } else {
      user.verifyPassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          user.numberOfLogins = user.numberOfLogins + 1;
          user.lastLogin = moment().format('MMM D, YYYY, H:ss');
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

exports.toggleBlock = function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (!user) {
      errorMessage(res, "Authentication failed. User not found.");
    } else {
      user.blocked = !user.blocked
      user.save();
      successMessage(res, "User blocked.")
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
    superUser: false,
    numberOfLogins: 0
  });
  user.save();

  var admin = new User({
    username: "admin1",
    password: "admin123",
    admin: true,
    superUser: true,
    numberOfLogins: 0
  });
  admin.save();

  var superUser = new User({
    username: "superUser",
    password: "admin123",
    admin: false,
    superUser: true,
    numberOfLogins: 0
  });
  superUser.save();
}

exports.getUsers = function(req, res) {
  User.find({}, function(err, users) {
    if (!err){ 
      res.send({ "users": users });
    } else {
      return errorMessage(res, err)
    }
});
}