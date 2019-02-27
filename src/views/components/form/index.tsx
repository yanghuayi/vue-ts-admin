import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Form',
})
export default class Form extends Vue {
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
