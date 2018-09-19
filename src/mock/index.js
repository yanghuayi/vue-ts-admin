const bodyParser = require('body-parser');

const login = require('./login');
const dashboard = require('./dashboard');
const customers = require('./customers');

module.exports = function mockInit(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.all('/api/*', login.authLogin);
  app.post('/api/user/login', login.loginByName);
  app.post('/api/user/getUserInfo', login.getUserInfo);
  app.post('/api/dashboard', dashboard);
  app.post('/api/customers/baseInfoList', customers.baseInfoList);
};
