import {
  Component, Prop, Emit, Vue, Watch, Provide,
} from 'vue-property-decorator';
import { Tabs } from 'ant-design-vue';
import config from '@/utils/config';
import { menuItem } from '@/interface';

import Header from '@/components/Layout/Header/Header';
import Sidebar from '@/components/Layout/Sidebar/Sidebar';
import './AppMain.less';

@Component({
  components: {
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
  },
})
export default class AppMain extends Vue {
  @Prop() private menuData!: menuItem[];

  // data
  onTabs: any = '1';

  @Watch('$route', { immediate: true, deep: true })
  routeChange(to: any, from: any) {
    this.$store.dispatch('AddTabPane', to.path);
  }

  @Emit()
  removeTab(name: string) {
    console.log(this);
    this.$store.dispatch('RemoveTab', name);
  }

  @Emit()
  tabChange(name: any) {
    this.tabList.forEach((item: any, indexs: number) => {
      if (item.name === name) {
        this.$router.push({ name: item.name, params: { id: item.params }, query: item.query });
        this.$store.dispatch('TabChange', item.name);
      }
    });
  }

  @Emit()
  onTabEdit(targetKey: string, action: string) {
    if (action === 'remove') {
      this.removeTab(targetKey);
    }
  }

  tabList = [];

  render() {
    const {
      sidebar: { opened = 1 }, tabList, tabActiveKey, keepList, isMobile,
    } = this.$store.state.app;
    this.onTabs = tabActiveKey; // 激活状态保存
    this.tabList = tabList;
    if (config.openPages.indexOf(this.$route.path) > -1) {
      return (
        <div class="app-one">
          <router-view />
        </div>
      );
    }
    return (
      <div class={`app-main ${opened ? '' : 'sideLayout'}`}>
        {
          isMobile ? null : <Sidebar />
        }
        <div class="page-content">
          <Header />
          <a-tabs class="page-tabs" activeKey={this.onTabs} type="editable-card" on-change={this.tabChange} on-edit={this.onTabEdit}>
            {
              tabList.map((item: any, index: number) => <a-tab-pane
              closable={tabList.length > 1} key={item.name}
              tab={item.name}>
              </a-tab-pane>)
            }
          </a-tabs>
          <div class="page-wrap">
            <keep-alive max={10} include={keepList}>
              <router-view/>
            </keep-alive>
          </div>
        </div>
      </div>
    );
  }
}
