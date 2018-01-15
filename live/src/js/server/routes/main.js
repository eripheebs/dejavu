import Express from 'express';

var router = Express.Router();

module.exports = function(passport){
  router.get('/', function(req, res) {
    res.render('index');
  });

  return router;
}
