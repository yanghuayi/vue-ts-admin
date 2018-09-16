import qs from 'qs';
import { MockConfig, menuItem } from '@/interface';
import utils from '@/utils';
import baseData from '@/mock/baseData';


export default {
  getMenu(config: MockConfig) {
    const menuData: menuItem[] = [
      {
        id: 1,
        title: '系统主页',
        url: '/dashboard',
        icon: 'dashboard',
        permission: true,
      },
      {
        id: 2,
        title: '系统管理',
        icon: 'setting',
        permission: [
          '/sys/org/list',
          '/sys/role/list',
          '/sys/user/list',
          '/sys/shop/list',
          '/sys/permission/list',
          '/sys/weixinuser/list',
        ],
        children: [
          {
            id: 21,
            title: '门店管理',
            url: '/system/shopManage',
            permission: '/sys/org/list',
          },
          {
            id: 22,
            title: '角色管理',
            url: '/system/role',
            permission: '/sys/role/list',
          },
          {
            id: 23,
            title: 'web用户',
            url: '/system/user',
            permission: '/sys/user/list',
          },
          {
            id: 24,
            title: '店铺设置',
            url: '/system/shopSettings',
            permission: '/sys/shop/list',
          },
          {
            id: 25,
            title: '部门管理',
            url: '/system/org',
            permission: true,
          },
          {
            id: 26,
            title: '权限管理',
            url: '/system/authorityManage',
            permission: '/sys/permission/list',
          },
          {
            id: 27,
            title: '微信用户',
            url: '/system/weChatManage',
            permission: '/sys/weixinuser/list',
          },
        ],
      },
      {
        id: 3,
        title: '车型管理',
        icon: 'car',
        permission: [
          '/model/brand/list',
          '/model/series/list',
          '/model/vm/list',
        ],
        children: [
          {
            id: 31,
            title: '品牌管理',
            url: '/allModalManage/brandManage',
            permission: '/model/brand/list',
          },
          {
            id: 32,
            title: '车系管理',
            url: '/allModalManage/seriesManage',
            permission: '/model/series/list',
          },
          {
            id: 33,
            title: '车型管理',
            url: '/allModalManage/modalManage',
            permission: '/model/vm/list',
          },
        ],
      },
      {
        id: 4,
        title: '设备管理',
        url: '/terminalManage',
        icon: 'server',
        permission: '/terminal/manage/list',
      },
    ];
    const data = baseData('success', '获取成功');
    data.entity = menuData;
    return data;
  },
};
