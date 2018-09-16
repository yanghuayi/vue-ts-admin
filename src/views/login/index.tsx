import {
  Component,
  Emit,
  Vue,
} from 'vue-property-decorator';
import { Form, Button, Input } from 'ant-design-vue';
import { login } from '@/api/app';
import config from '@/utils/config';

import './login.less';

@Component({
  components: {
  "a-form": Form,
  "a-form-item": Form.Item,
  "a-button": Button,
  "a-input": Input
  },
  props: {
  Form,
  }
  })
class Login extends Vue {
  loginForm: {
    username: string;
    password: string;
  } = { username: '', password: '' };
  loginRules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  };
  config = config;
  imgToken = '';
  loading = false;
  created() {
  }
  @Emit()
  submitForm() {
    this.Form.validateFields((err: any, values: object) => {
      if (!err) {
        this.loading = true;
        login({ ...values }).then((res) => {
          this.loading = false;
          const { result: { resultCode, resultMessage }, entity } = res;
          if (resultCode !== '0') {
            this.$message.error(resultMessage || '未知错误');
          } else {
            this.$message.success(resultMessage);
            localStorage.setItem('token', entity);
            this.$store.dispatch('getUserInfo').then(() => {
              this.$router.push('/');
            }).catch((error) => {
              this.$message.error(error);
            });
          }
        }).catch((errs) => {
          this.loading = false;
          this.$message.error(errs.message);
        });
        return true;
      }
      return false;
    });
  }

  render() {
    return (
      <div class="loginWrap">
        <h2 class="loginTxt">欢迎使用<br/>VUE-TS-ADMIN</h2>
        <div class="loginForm">
          <div class="logo">
            <img alt="logo" src={require('../../assets/logo.svg')} />
            <span>{config.name}</span>
          </div>
          <a-form ref="loginForm" on-submit={this.submitForm}>
            <a-form-item prop="username">
              <a-input
                id="username"
                prefix-icon="iconfont-user"
                placeholder="请输入用户名"
              />
            </a-form-item>
            <a-form-item prop="password">
              <a-input
                id="password"
                prefix-icon="iconfont-lock"
                type="password"
                placeholder="请输入密码"
              />
            </a-form-item>
            <a-form-item>
              <a-button
                loading={this.loading}
                type="primary"
                on-click={this.submitForm}
              >登录</a-button>
            </a-form-item>
          </a-form>
          <div class="tips">
            <span>用户名：admin</span>
            <span class="right">密码：admin</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);
