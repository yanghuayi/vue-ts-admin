import { PluginFunction, PluginObject } from 'vue';
import request from '@/utils/request';

const Plugin: PluginObject<object> = {
  install(Vue, options): void {
    Vue.prototype.$fetch = request;
  },
};

declare module 'vue/types/vue' {
  interface Vue {
    $fetch: Function
  }
}

export default Plugin;
