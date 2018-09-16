import { Component, Emit, Vue, Prop } from 'vue-property-decorator';
import { Menu } from 'ant-design-vue';
import { routerItem } from '@/interface';
import './MenuList.less';

@Component({
  components: {
  'a-menu': Menu,
  'a-submenu': Menu.SubMenu,
  'a-menu-item-group': Menu.ItemGroup,
  'a-menu-item': Menu.Item,
  }
  })
export default class MenuList extends Vue {
  @Prop({ default: '#010101' }) private bgColor!: string;
  @Prop({ default: '#fff' }) private txtColor!: string;
  @Emit()
  handleOpen(key: string, keyPath: string) {
    const self = this;
    console.log(key, keyPath);
  }
  @Emit()
  handleClose(key: string, keyPath: string) {
    const self = this;
    console.log(key, keyPath);
  }
  render() {
    const { menuData, sidebar: { opened } } = this.$store.state.app;
    return (
      <a-menu
        inlineCollapsed={!opened}
        theme='dark'
        mode="inline"
        class="left-menu"
        on-click={(params: {item: any, key: string, keyPath: string[]}) => {
          this.openPage(`${params.keyPath.length > 1 ? `${params.keyPath[1]}/${params.keyPath[0]}` : params.keyPath[0]}`);
        }}
      >
        {menuData ? this.renderMenu(menuData) : null}
      </a-menu>
    );
  }
  renderMenu(menuData: routerItem[], parentPath?: string): (JSX.Element | null)[] {
    return menuData.map((item: routerItem) => {
      if (item.children) {
        let isEmpty = true;
        item.children.forEach((items: routerItem) => {
          if (!items.hidden) {
            isEmpty = false;
          }
        });
        if (isEmpty) {
          return <a-menu-item
            id={item.path}
            key={`${item.path}`}>
            <i class={`iconfont-${item.icon}`}></i>
            <span>{item.name}</span>
          </a-menu-item>;
        }
        return <a-submenu
          id={item.path}
          key={item.path}>
          <template slot="title">
            <i class={`iconfont-${item.icon}`}></i>
            <span>{item.name}</span>
          </template>
          {this.renderMenu(item.children, parentPath ? `${parentPath}/${item.path}` : item.path)}
        </a-submenu>;
      } else if (item.hidden) {
        return null;
      }
      return <a-menu-item
        id={item.path}
        key={`${item.path}`}>
        <i class={`iconfont-${item.icon}`}></i>
        <span>{item.name}</span>
      </a-menu-item>;
    });
  }
  openPage(path: string) {
    this.$router.push(path);
  }
}
