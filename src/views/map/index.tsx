import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Map',
})
export default class Map extends Vue {
  render() {
    const { keepList } = this.$store.state.app;
    return (
      <div>
        <keep-alive max={10} include={keepList}>
          <router-view/>
        </keep-alive>
      </div>
    );
  }
}
