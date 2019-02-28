import config from '@/utils/config';
import router, { asyncRouterMap, constantRouterMap } from '@/router';
import { routerItem } from '@/interface';

interface UserData {
  username: string,
  userid: string,
  avatarUri: string,
  email: string
}

function filterAsyncRouter(
  AsyncRouterMap: routerItem[],
  permission: string[],
): routerItem[] {
  const routerMap = AsyncRouterMap.filter((item) => {
    if (typeof item.permission === 'string') {
      return permission.indexOf(item.permission) > -1;
    } if (item.permission instanceof Array) {
      const filter = item.permission.filter(items => permission.indexOf(items) > -1);
      if (filter.length && item.children) {
        item.children = filterAsyncRouter(item.children, permission);
      }
      return filter.length;
    }
    return item.permission;
  });
  return routerMap;
}

const hasPermission = (permission: string[]) => { // 过滤路由
  const filterRouter = filterAsyncRouter(asyncRouterMap, permission);
  // 添加路由的时候排除掉dashboard
  router.addRoutes(filterRouter);
  return filterRouter;
};

const user = {
  state: {
    user: {
      username: '',
      userid: '',
      avatar_uri: '',
      email: '',
    },
    roles: [],
    permission_routers: [],
    spinning: true,
  },
  mutations: {
    SAVEROLES: (state: any, roles: Array<any>) => {
      state.roles = roles;
    },
    SVAEUSER: (state: any, userData: UserData) => {
      state.user = user;
    },
    LOADING: (state: any, loading: boolean) => {
      state.spinning = loading;
    },
  },
  actions: {
    getUserInfo: (context: any) => new Promise((resolve, reject) => {
      const params = {
        token: localStorage.getItem('token'),
      };
      context.commit('LOADING', false);
      window.api.getUserInfo(params).then((res: returnData) => {
        context.commit('LOADING', true);
        const { result, entity } = res.data;
        if (!result.resultCode) {
          const userData: UserData = {
            username: entity.username,
            userid: entity.id,
            avatarUri: entity.avatar_uri,
            email: entity.email,
          };
          context.commit('SVAEUSER', userData);
          context.commit('SAVEROLES', entity.permissions);
          const getRouter = hasPermission(entity.permissions.permission);
          context.dispatch('GetMenuData', getRouter);
          resolve(entity);
        } else {
          reject(result.resultMessage);
        }
      }).catch((error: any) => {
        context.commit('LOADING', true);
        reject(error);
      });
    }),
  },
};

export default user;
