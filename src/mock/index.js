const login = require('./login');
module.exports = function mockInit(app) {
  app.post('/api/user/login', login.loginByName);
  app.post('/api/user/getUserInfo', login.getUserInfo);
};
