import Mock from 'mockjs';
import loginAPI from '@/mock/login';
import userAPI from '@/mock/user';

// 登录相关
Mock.mock(/\/sys\/user\/login/, 'post', loginAPI.loginByUsername);
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout);
Mock.mock(/\/sys\/user\/getUserInfo/, 'post', loginAPI.getUserInfo);

// 菜单数据
Mock.mock(/\/sys\/user\/getMenu/, 'get', userAPI.getMenu);

export default Mock;
