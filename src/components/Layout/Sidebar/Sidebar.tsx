import { Component, Vue } from 'vue-property-decorator';
import config from '@/utils/config';
import MenuList from '@/components/Layout/Sidebar/MenuList';
import './Sidebar.less';


@Component
export default class SiderBar extends Vue {
  render() {
    const { menuData, sidebar: { opened } } = this.$store.state.app;
    return (
      <div class="side-bar">
        <div class="logo-wrap">
          <img src={config.logo} alt="logo"/>
          <h1 className="txt">{config.name}</h1>
        </div>
        <MenuList />
      </div>
    );
  }
}
