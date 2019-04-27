import { Component, Emit, Vue } from 'vue-property-decorator';
import {
  Form, Button, Input, Icon,
} from 'ant-design-vue';
import config from '@/utils/config';

import './login.less';

@Component({
  components: {
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-button': Button,
    'a-input': Input,
    'a-icon': Icon,
  },
  props: {
    Form,
  },
})
class Login extends Vue {
  loginForm: {
    username: string;
    password: string;
  } = { username: '', password: '' };

  config = config;

  imgToken = '';

  loading = false;

  created() {}

  @Emit()
  submitForm() {
    this.Form.validateFields((err: any, values: object) => {
      if (!err) {
        this.loading = true;
        window.api
          .login({ ...values })
          .then((res) => {
            this.loading = false;
            const {
              result: { resultCode, resultMessage },
            } = res.data;
            if (resultCode !== 0) {
              this.$message.error(resultMessage || 'unkown error');
            } else {
              this.$message.success(resultMessage);
              this.$store
                .dispatch('getUserInfo')
                .then(() => {
                  this.$router.push('/');
                })
                .catch((error) => {
                  this.$message.error(error);
                });
            }
          })
          .catch((errs: any) => {
            this.loading = false;
            this.$message.error(errs.message);
          });
        return true;
      }
      return false;
    });
  }

  render() {
    const { getFieldDecorator } = this.Form;
    return (
      <div class="loginWrap">
        <h2 class="loginTxt">
          WELCOME
          <br />
          VUE-TS-ADMIN
        </h2>
        <div class="loginForm">
          <div class="logo">
            <img alt="logo" src={require('../../assets/logo.svg')} />
            <span>{config.name}</span>
          </div>
          <a-form ref="loginForm" on-submit={this.submitForm}>
            <a-form-item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please enter a user name' }],
              })(
                <a-input
                  id="username"
                  prefix-icon="iconfont-user"
                  placeholder="Please enter a user name"
                >
                  <a-icon slot="prefix" type="user" />
                </a-input>,
              )}
            </a-form-item>
            <a-form-item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please enter a password' }],
              })(
                <a-input
                  id="password"
                  prefix-icon="iconfont-lock"
                  type="password"
                  on-pressEnter={this.submitForm}
                  placeholder="Please enter a user name"
                >
                  <a-icon slot="prefix" type="lock" />
                </a-input>,
              )}
            </a-form-item>
            <a-form-item>
              <a-button loading={this.loading} type="primary" on-click={this.submitForm}>
                Login
              </a-button>
            </a-form-item>
          </a-form>
          <div class="tips">
            <span>username：admin</span>
            <span class="right">password：admin</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create({})(Login);
