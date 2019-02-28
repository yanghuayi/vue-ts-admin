import {
  Component, Prop, Emit, Vue, Inject, Provide,
} from 'vue-property-decorator';
import './index.less';

@Component
export default class Spin extends Vue {
  @Prop({ default: false }) show!: boolean;

  render() {
    return (
      <div class={['spin-wrap', this.show ? 'show' : '']}>
        {
          this.show ? <div class="ant-spin ant-spin-spinning">
            <span class="ant-spin-dot ant-spin-dot-spin">
            <i></i><i></i><i></i><i></i>
            </span>
          </div> : ''
        }
      </div>
    );
  }
}
