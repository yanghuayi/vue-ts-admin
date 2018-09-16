import Vue from 'vue';
import Router, { RouterOptions } from 'vue-router';
import { routerItem } from '@/interface';

const getComponent = require(`./import_${process.env.NODE_ENV}`);

export const constantRouterMap: routerItem[] & RouterOptions['routes'] = [
  {
    path: '/', redirect: '/dashboard',
  },
  {
    path: '/login', name: '登录', component: getComponent('login/index'),
  },
  {
    path: '/modiflyPwd', name: '修改密码', component: getComponent('updatePwd/index.vue'),
  },
  {
    path: '/updateSelf', name: '个人中心', component: getComponent('updateSelf/index.vue'),
  },
  {
    path: '*', name: '404', component: getComponent('error/404.vue'),
  },
  {
    path: '/401', name: '401', component: getComponent('error/401.vue'),
  },
  {
    path: '/dashboard',
    name: '系统主页',
    component: getComponent('dashboard/index'),
    meta: { key: 'Dashboard' },
  },
];
/**
 * permission 有3种类型： Boolean Array String
 * Boolean值的情况，为true，有权限，为false，没有权限
 * Array值的情况，只要其中一个有，就有权限，
 * String值，会匹配vuex里面的perssions数组，如果有，就有权限
*/
export const asyncRouterMap: routerItem[] = [
  {
    path: '/dashboard',
    icon: 'dashboard',
    name: '系统主页',
    component: getComponent('dashboard/index'),
    permission: true,
    meta: { key: 'Dashboard' },
  },
];

Vue.use(Router);

export default new Router({
  routes: constantRouterMap,
});
