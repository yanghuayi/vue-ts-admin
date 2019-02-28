const qs = require('qs');
const Mock = require('mockjs');
const baseData = require('./baseData');

const userPermission = {
  DEFAULT: ['1', '2', '3', '4', '5'],
  ADMIN: ['1', '2', '3', '4', '5', '6', '7', '8'],
  DEVELOPER: ['1', '2', '3'],
};

const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
  }, {
    id: 1,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
  }, {
    id: 2,
    username: '吴彦祖',
    password: '123456',
    permissions: userPermission.DEVELOPER,
  },
];
const noAuthList = ['/api/user/login'];
module.exports = {
  loginByName(req, res) {
    const { username, password } = req.body;
    const user = adminUsers.filter(item => item.username === username);
    if (user.length > 0 && user[0].password === password) {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      res.cookie('token', JSON.stringify({ id: user[0].id, deadline: now.getTime() }), {
        maxAge: 900000,
        httpOnly: true,
      });
      res.json(baseData('success', '登录成功'));
    } else {
      res.json(baseData('error', '用户名密码错误'));
    }
  },
  authLogin(req, res, next) {
    if (noAuthList.indexOf(req.path) > -1) {
      next();
      return;
    }
    const cookie = req.headers.cookie || '';
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' });
    const response = {};
    if (!cookies.token) {
      res.status(200).send(baseData('error', '登录超时', 3));
      return;
    }
    const token = JSON.parse(cookies.token);
    if (token) {
      response.success = token.deadline > new Date().getTime();
    }
    if (response.success) {
      next();
    } else {
      res.status(200).send(baseData('error', '登录超时', 3));
    }
  },
  getUserInfo(req, res) {
    const cookie = req.headers.cookie || '';
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' });
    const token = JSON.parse(cookies.token);
    const user = {};
    const userItem = adminUsers.filter(_ => _.id === token.id);
    if (userItem.length > 0) {
      user.permissions = userItem[0].permissions;
      user.username = userItem[0].username;
      user.id = userItem[0].id;
    }
    const data = baseData('success', '操作成功');
    data.entity = user;
    res.json(data);
  },
};
