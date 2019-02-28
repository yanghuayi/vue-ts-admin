import { Vue, Component, Prop } from 'vue-property-decorator';
import {
  Modal, Form, Input, Radio, DatePicker, InputNumber, Cascader,
} from 'ant-design-vue';
import moment from 'moment';
import city from '@/utils/city';

@Component({
  components: {
    'a-modal': Modal,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-input-number': InputNumber,
    'a-radio': Radio,
    'a-radio-group': Radio.Group,
    'a-date-picker': DatePicker,
    'a-cascader': Cascader,
  },
  props: {
    Form,
  },
})
class InfoModal extends Vue {
  @Prop() title!: string;

  @Prop() visible!: boolean;

  @Prop() type!: string;

  @Prop() data!: any;

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  }

  submit() {
    this.Form.validateFields([], {}, (err: any, values: any) => {
      if (!err) {
        if (this.type === 'add') {
          window.api.baseInfoAdd(values).then((res: any) => {
            const { result: { resultCode, resultMessage } } = res.data;
            if (!resultCode) {
              this.$message.success(resultMessage);
              this.Form.resetFields();
              this.$emit('success');
            } else {
              this.$message.error(resultMessage);
            }
          });
        } else {
          window.api.baseInfoUpdate(values).then((res: any) => {
            const { result: { resultCode, resultMessage } } = res.data;
            if (!resultCode) {
              this.$message.success(resultMessage);
              this.Form.resetFields();
              this.$emit('success');
            } else {
              this.$message.error(resultMessage);
            }
          });
        }
      }
    });
  }

  cancel() {
    this.$emit('close');
  }

  render() {
    const { getFieldDecorator } = this.Form;
    return (
      <a-modal
        title={this.title}
        visible={this.visible}
        on-ok={this.submit}
        on-cancel={this.cancel}
      >
        <a-form>
          <a-form-item
          {...{ props: this.formItemLayout }}
          label="name"
          >
            {getFieldDecorator('name', {
              initialValue: this.data.name,
              rules: [
                { required: true, message: 'please enter the name' },
              ],
            })(<a-input placeholder="name"></a-input>)}
          </a-form-item>
          <a-form-item
          {...{ props: this.formItemLayout }}
          label="nickName"
          >
            {getFieldDecorator('nickName', {
              initialValue: this.data.nickName,
              rules: [
                { required: true, message: 'please enter the nickName' },
              ],
            })(<a-input placeholder="nickName"></a-input>)}
          </a-form-item>
          <a-form-item
          {...{ props: this.formItemLayout }}
          label="age"
          >
            {getFieldDecorator('age', {
              initialValue: this.data.age,
              rules: [
                { required: true, message: 'please enter the age' },
              ],
            })(<a-input-number style="width: 100%" placeholder="age"></a-input-number>)}
          </a-form-item>
          <a-form-item
          {...{ props: this.formItemLayout }}
          label="phone"
          >
            {getFieldDecorator('phone', {
              initialValue: this.data.phone,
              rules: [
                { required: true, message: 'please enter the phone' },
                {
                  pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
                  message: 'Please enter the correct phone number',
                },
              ],
            })(<a-input htmlType="number" placeholder="phone"></a-input>)}
          </a-form-item>
          <a-form-item
          {...{ props: this.formItemLayout }}
          label="birthDate"
          >
            {getFieldDecorator('birthDate', {
              initialValue: this.data.birthDate,
              rules: [
                { required: true, message: 'please select the birthDate' },
              ],
            })(<a-date-picker
              format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
              showTime={ { defaultValue: moment('00:00:00', 'HH:mm:ss') } }
            />)}
          </a-form-item>
          <a-form-item
          {...{ props: this.formItemLayout }}
          label="isMale"
          >
            {getFieldDecorator('isMale', {
              initialValue: this.data.isMale,
              rules: [
                { required: true, message: 'please select the birthDate' },
              ],
            })(<a-radio-group>
                <a-radio value={true}>Male</a-radio>
                <a-radio value={false}>Female</a-radio>
              </a-radio-group>)}
          </a-form-item>
          <a-form-item
          {...{ props: this.formItemLayout }}
          label="id Number"
          >
            {getFieldDecorator('id', {
              initialValue: this.data.id,
              rules: [
                { required: true, message: 'please enter the id Number' },
              ],
            })(<a-input placeholder="id Number"></a-input>)}
          </a-form-item>
          <a-form-item
          {...{ props: this.formItemLayout }}
          label="email"
          >
            {getFieldDecorator('email', {
              initialValue: this.data.email,
              rules: [
                { required: true, message: 'please enter the id email' },
              ],
            })(<a-input placeholder="email"></a-input>)}
          </a-form-item>
          <a-form-item
          {...{ props: this.formItemLayout }}
          label="address"
          >
            {getFieldDecorator('address', {
              initialValue: this.data.address,
              rules: [
                { required: true, message: 'please select the address' },
              ],
            })(<a-cascader
              allowClear
              options={city}
              placeholder="please select the address"
              >
              </a-cascader>)}
          </a-form-item>
        </a-form>
      </a-modal>
    );
  }
}

export default Form.create({
  props: {
    title: String,
    visible: Boolean,
    type: String,
    data: Object,
  },
})(InfoModal);
