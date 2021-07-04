//user routes
module.exports = app => {
  const user = require('../controllers/user.controller')
  const router = require("express").Router();
  const authJwt = require('../middlewares/authJwt');
  //register user
  router.post('/register', user.registerUser);
  //login user
  router.post('/login', user.loginUser);
  //get user by id
  router.get('/get/:id',[authJwt.verifyToken],user.getUser);
  //verify a user
  router.put('/verify',user.verifyUser);

  app.use('/api/user', router);
}