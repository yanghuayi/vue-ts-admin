import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Customers',
})
export default class Customers extends Vue {
  render() {
    const { keepList } = this.$store.state.app;
    return (
      <keep-alive max={10} include={keepList}>
        <router-view/>
      </keep-alive>
    );
  }
}
