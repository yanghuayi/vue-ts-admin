import { Component, Vue } from 'vue-property-decorator';
import {
  Form, Input, Select, Radio, Card, Dropdown, Menu, Icon, DatePicker, Button, Modal,
} from 'ant-design-vue';

import './index.less';

@Component({
  name: 'baseForm',
  components: {
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-select': Select,
    'a-radio': Radio,
    'a-radio-group': Radio.Group,
    'a-card': Card,
    'a-dropdown': Dropdown,
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
    'a-icon': Icon,
    'a-date-picker': DatePicker,
    'a-button': Button,
    'a-modal': Modal,
  },
  props: {
    Form,
  },
})

class BaseForm extends Vue {
  itemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 6 },
    },
  }

  submit(e: HTMLFormElement) {
    e.preventDefault();
    this.Form.validateFields((err: any, values: object) => {
      if (!err) {
        Modal.info({
          title: '表单数据',
          content: JSON.stringify(values),
          onOk() {},
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.Form;
    return (
      <div class="base-form-wrap">
        <a-card
          title="Base Form"
        >
          <a-dropdown slot="extra">
            <a class="ant-dropdown-link">
              <a-icon type="ellipsis" style="font-size: 22px" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a>1st menu item</a>
              </a-menu-item>
              <a-menu-item>
                <a>2nd menu item</a>
              </a-menu-item>
              <a-menu-item>
                <a>3rd menu item</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-form on-submit={this.submit}>
            <a-form-item {...{ props: this.itemLayout }} label="客户姓名">
              {
                getFieldDecorator('name', {
                  rules: [
                    { required: true, message: '请输入客户姓名' },
                  ],
                })(<a-input placeholder="请输入客户姓名"></a-input>)
              }
            </a-form-item>
            <a-form-item {...{ props: this.itemLayout }} label="客户昵称">
              {
                getFieldDecorator('nickname', {
                  rules: [
                    { required: true, message: '请输入客户昵称' },
                  ],
                })(<a-input placeholder="请输入客户昵称"></a-input>)
              }
            </a-form-item>
            <a-form-item {...{ props: this.itemLayout }} label="登录名">
              {
                getFieldDecorator('loginName', {
                  rules: [
                    { required: true, message: '请输入登录名' },
                  ],
                })(<a-input placeholder="请输入登录名"></a-input>)
              }
            </a-form-item>
            <a-form-item {...{ props: this.itemLayout }} label="手机号">
              {
                getFieldDecorator('loginName', {
                  rules: [
                    { required: true, message: '请输入手机号' },
                    {
                      pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
                      message: '请输入正确的手机号',
                    },
                  ],
                })(<a-input placeholder="请输入手机号"></a-input>)
              }
            </a-form-item>
            <a-form-item {...{ props: this.itemLayout }} label="出生日期">
              {
                getFieldDecorator('birthDate', {
                  rules: [
                    { required: true, message: '请选择出生日期' },
                  ],
                })(<a-date-picker placeholder="请选择出生日期"></a-date-picker>)
              }
            </a-form-item>
            <a-form-item {...{ props: this.itemLayout }} label="性别">
              {
                getFieldDecorator('isMale', {
                  rules: [
                    { required: true, message: '请选择性别' },
                  ],
                })(<a-radio-group>
                <a-radio value={0}>男</a-radio>
                <a-radio value={1}>女</a-radio>
                <a-radio value={2}>火星人</a-radio>
              </a-radio-group>)
              }

            </a-form-item>
            <a-form-item {...{ props: this.itemLayout }} label="身份证号码">
              {
                getFieldDecorator('idNumber', {
                  rules: [
                    { required: true, message: '请输入身份证号码' },
                  ],
                })(<a-input placeholder="身份证号码"></a-input>)
              }
            </a-form-item>
            <a-form-item {...{ props: this.itemLayout }} label="Email">
              {
                getFieldDecorator('email', {
                  rules: [
                    { required: true, message: '请输入Email' },
                  ],
                })(<a-input placeholder="请输入Email"></a-input>)
              }
            </a-form-item>
            <a-form-item {...{ props: this.itemLayout }} label="联系地址">
            {
                getFieldDecorator('address', {
                  rules: [
                    { required: true, message: '请输入联系地址' },
                  ],
                })(<a-input placeholder="请输入联系地址"></a-input>)
              }
              <div class="form-btn-wrap">
                <a-button type="primary" htmlType="submit">提交</a-button>
                <a-button>重置</a-button>
              </div>
            </a-form-item>
          </a-form>
        </a-card>
      </div>
    );
  }
}

export default Form.create({})(BaseForm);
