module.exports = app => {
  const user = require('../controllers/user.controller')
  const router = require("express").Router();
  router.post('/register', user.registerUser);
  router.post('/login', user.loginUser);
  router.get('/get/:id',user.getUser);
  app.use('/api/user', router);
}