import Vue from 'vue';
import { message } from 'ant-design-vue';
// 自定义全局组件
import FilterTable from '@/components/FilterTable/index.vue';

import App from '@/App';
import router from '@/router';
import store from '@/store';
import config from '@/utils/config';
import Api from '@/api/api';

import './styles/global.less';

// 全局api
window.api = new Api({ baseUrl: process.env.NODE_ENV === 'production' ? '' : '/api' }).api;

const options = {
  position: 'fixed',
  show: true,
  height: '3px',
};

// Vue.use(VueInsProgressBar, options);
Vue.prototype.$message = message;
Vue.component('filter-table', FilterTable);

Vue.config.productionTip = false;

let flag: boolean = true;
// 路由拦截，权限验证和菜单生成
router.beforeEach((to, from, next) => {
  if (!store.state.app.menuData.length && flag) { // 判断是否获取到菜单数据,并且只执行一次
    flag = false;
    store.dispatch('getUserInfo').then(() => {
      const toPath = config.noLoginList.indexOf(`#${to.path}`) > -1 ? '/dashboard' : to.path;
      store.dispatch('AddTabPane', toPath).then(() => {
        next({
          path: toPath, query: to.query, params: to.params, replace: true,
        });
      });
    }).catch((err) => {
      console.log(err);
      if (config.noLoginList.indexOf(to.path) < 0) {
        next({ name: 'login', replace: true });
      }
      next();
    });
  }
  next();
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
