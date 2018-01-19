import Express from 'express';
var authRouter = Express.Router();

import userHelpers from './userHelpers.js';

module.exports = function(passport){
  authRouter.post('/signUp', passport.authenticate('jwt', { session: false }), function(req, res) {
    userHelpers.signUp(req, res)
  });

  authRouter.post('/logIn', function(req, res) {
    userHelpers.logIn(req, res);
  });

  authRouter.post('/toggleBlock', passport.authenticate('jwt', { session: false }), function(req, res) {
    userHelpers.toggleBlock(req, res);
  });

  authRouter.get('/logOut', passport.authenticate('jwt', { session: false }), function(req, res) {
    userHelpers.logOut(req, res);
  });

  authRouter.get('/users/me', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json({ id: req.user.id, username: req.user.username });
  });

  authRouter.post('/users', passport.authenticate('jwt', { session: false }), function(req, res) {
    userHelpers.getUsers(req, res);
  });

  authRouter.post('/authenticate', function(req, res) {
    userHelpers.authenticate(req, res);
  });

  return authRouter
}
