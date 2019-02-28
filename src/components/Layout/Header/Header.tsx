import {
  Component, Prop, Emit, Vue, Watch,
} from 'vue-property-decorator';
import {
  Badge, Dropdown, Breadcrumb, Popover, Icon, Menu,
} from 'ant-design-vue';
import Cookies from 'js-cookie';
import { menuItem, routerItem } from '@/interface';
import { routeToArray } from '@/utils';
import MenuList from '@/components/Layout/Sidebar/MenuList';
import './Header.less';

interface breadItem {
  url: string,
  text: string,
}

@Component({
  components: {
    'a-badge': Badge,
    'a-dropdown': Dropdown,
    'a-menu-item': Menu.Item,
    'a-breadcrumb': Breadcrumb,
    'a-breadcrumb-item': Breadcrumb.Item,
    'a-popover': Popover,
    'menu-list': MenuList,
    'a-icon': Icon,
    'a-menu-divider': Menu.Divider,
    'a-menu': Menu,
  },
})
export default class Header extends Vue {
  @Prop() private username!: string;

  // data
  menuData: routerItem[] = [];

  breadList: breadItem[] = [];

  onIndex: number = 0;

  @Watch('$route', { immediate: true, deep: true })
  routeChange(to: any, from: any) {
    const toDepth = routeToArray(to.path);
    this.onIndex = 0;
    this.breadList = [];
    this.routerBread(this.menuData, toDepth.routeArr);
  }

  @Watch('menuData')
  initRouteBread() {
    const toDepth = routeToArray(this.$route.path);
    this.routerBread(this.menuData, toDepth.routeArr);
  }

  @Emit()
  routerBread(data: routerItem[], toDepth: string[]) {
    data.map((item: routerItem) => {
      if (item.path === toDepth[this.onIndex]) {
        this.breadList.push({
          url: item.path,
          text: item.name ? item.name : '',
        });
        if (item.children && (toDepth.length - 1) >= this.onIndex) {
          this.onIndex += 1;
          this.routerBread(item.children, toDepth);
        }
      }
      return true;
    });
  }

  @Emit()
  menuClick(params: {item: any, key: string, keyPath: string[]}): void {
    const self = this;
    switch (params.key) {
      case '1':
        break;
      case '2':
        break;
      case '3':
        Cookies.remove('token');
        this.$router.push('/login');
        break;
      default:
        break;
    }
  }

  @Emit()
  switchSidebar(): void {
    this.$store.dispatch('ToggleSideBar');
  }

  render() {
    const { username } = this;
    const { menuData, sidebar: { opened }, isMobile } = this.$store.state.app;
    this.menuData = menuData;
    return (
      <header class="header-wrap">
        <div class="header-left">
          {
            isMobile ? <a-popover
            placement="bottom"
            title=""
            width="300"
            trigger="click">
            <menu-list slot="content" bgColor="#fff" txtColor="#898989" />
            <i class="menu-btn iconfont-listMenu"></i>
          </a-popover> : <i class={`menu-btn iconfont-${opened ? 'indent' : 'outdent'}`} on-click={this.switchSidebar}></i>
          }
          {
            isMobile ? null
              : <a-breadcrumb class="header-bread" separator="/">
              {
                this.breadList.map((item: breadItem) => <a-breadcrumb-item to={item.url ? { path: '/' } : null}>{item.text}</a-breadcrumb-item>)
              }
            </a-breadcrumb>
          }
        </div>
        <ul class="header-menu">
          <li>
            <a-badge count={12} class="item">
              <i class="iconfont-email"></i>
            </a-badge>
          </li>
          <li>
            <i class="iconfont-bell"></i>
          </li>
          <li class="user">
            <a-dropdown>
              <span class="ant-dropdown-link">
                <a-icon type="user" />
                <span class="name">admin</span>
              </span>
              <a-menu slot="overlay" on-click={this.menuClick}>
                <a-menu-item key="1">个人中心</a-menu-item>
                <a-menu-item key="2">修改密码</a-menu-item>
                <a-menu-divider />
                <a-menu-item key="3"><font color="red">退出登录</font></a-menu-item>
              </a-menu>
            </a-dropdown>
          </li>
        </ul>
      </header>
    );
  }
}
