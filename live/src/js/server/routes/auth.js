import Express from 'express';
var authRouter = Express.Router();

import userHelpers from './userHelpers.js';

module.exports = function(passport){
  authRouter.route('/signUp')
    .post(userHelpers.signUp)

  authRouter.post('/logIn', function(req, res) {
    userHelpers.logIn(req, res);
  });

  authRouter.get('/logOut', passport.authenticate('jwt', { session: false }), function(req, res) {
    userHelpers.logOut(req, res);
  });

  return authRouter
}
