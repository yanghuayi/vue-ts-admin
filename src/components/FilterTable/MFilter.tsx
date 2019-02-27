import {
  Component, Prop, Emit, Vue,
} from 'vue-property-decorator';
import {
  Input, Select, Form, TimePicker, DatePicker, Cascader, Row, Col, Button, Modal, Checkbox, Radio,
} from 'ant-design-vue';
import { FilterFormList, tableList } from '@/interface';

import './MFilter.less';

@Component({
  components: {
    'a-input': Input,
    'a-option': Select.Option,
    'a-select': Select,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-time-picker': TimePicker,
    'a-date-picker': DatePicker,
    'a-range-picker': DatePicker.RangePicker,
    'a-cascader': Cascader,
    'a-row': Row,
    'a-col': Col,
    'a-button': Button,
    'a-modal': Modal,
    'a-radio-group': Radio.Group,
    'a-radio-button': Radio.Button,
    'a-checkbox-group': Checkbox.Group,
    'a-checkbox': Checkbox,
  },
})

class MFilterClass extends Vue {
  // 筛选表单生成参数
  @Prop({ default: [] })
  private filterList!: FilterFormList[];

  // 筛选表单高级生成参数
  @Prop({ default: [] })
  private filterGrade!: FilterFormList[];

  // 筛选表单存储数据参数
  @Prop({ default: {} }) private filterParams!: any;

  // 是否展示新增按钮
  @Prop({ default: false }) private addBtn!: boolean;

  // 是否展示导出按钮
  @Prop({ default: false }) private exportBtn!: boolean;

  // 导出按钮回调事件
  @Prop({ default: () => { } }) private exportFun!: Function;

  // tablelist 参数
  @Prop({ default: [] }) private tableList!: tableList[];

  @Prop({ default: '100px' }) private labelWidth!: string;

  @Prop({ default: 'filterTable' }) private localName!: string;

  // data
  params: any = JSON.parse(JSON.stringify(this.filterParams));

  // 初始化表格筛选参数
  initParams: any = JSON.parse(JSON.stringify(this.filterParams));

  btnXl: number = 24 - (this.filterList.length * 3);

  btnlg: number = 24 - (this.filterList.length * 3);

  btnmd: number = 24 - (this.filterList.length * 4);

  // 弹出窗开关
  setModel: boolean = false;

  // 表格显示的列表
  checkList: Array<string> = [];

  // 高级搜索开关
  showGrade: boolean = false;

  // 高级筛选高度
  tableMarginTop: number = 0;

  constructor(props: any) {
    super(props);
    const self = this;
    const saveList = window.localStorage.getItem(this.localName);
    if (saveList) {
      this.checkList = saveList.split(',');
    }
  }

  created() {
    if (!this.checkList.length) {
      this.tableList.map((item) => {
        if (item.dataIndex) {
          this.checkList.push(item.dataIndex);
        }
        return false;
      });
    }
  }

  // methods
  @Emit()
  onSearch(): void {
    this.$emit('search', Object.assign(this.params, this.form.getFieldsValue()));
  }

  @Emit()
  reset(): void {
    this.form.resetFields();
    this.$emit('clearOut');
    this.params = JSON.parse(JSON.stringify(this.initParams));
    this.$emit('search', this.form.resetFields());
  }

  @Emit()
  levelcodeChange(val: any, key: string): void {
    const value = JSON.parse(JSON.stringify(val));
    this.params.levelCode = value.pop();
  }

  @Emit()
  openSetting(): void {
    this.setModel = true;
  }

  @Emit()
  closeModal(): void {
    this.setModel = false;
  }

  @Emit()
  gradeSwitch(val: boolean): void {
    this.showGrade = val;
    this.tableMarginTop = val
      ? (this.$refs.filterGrade as Element).clientHeight
      : (this.$refs.filterNormal as Element).clientHeight;
    this.$emit('tableHeight', this.tableMarginTop);
  }

  @Emit()
  addFun(): void {
    this.$emit('addFun');
  }

  formItem(getFieldDecorator: any, item: FilterFormList, index: number, grade?: boolean) {
    let itemDom = null;
    switch (item.type) {
      case 'input':
        itemDom = <a-input id={item.key}
          placeholder={item.placeholder}></a-input>;
        break;
      case 'select':
        itemDom = <a-select
          style="width: 100%;"
          id={item.key}
          placeholder={item.placeholder}>
          {
            item.options && item.options.map((items: any, indexs: number) => <a-option
              key={indexs} value={items.value}>{ items.label }</a-option>)
          }
        </a-select>;
        break;
      case 'cascader':
        itemDom = <a-cascader style="width: 100%;"
          id={item.key}
          allowClear
          changeOnSelect
          fieldNames={item.fieldNames}
          options={item.options}
          placeholder={item.placeholder}
          on-change={item.change}></a-cascader>;
        break;
      case 'levelcode':
        itemDom = <a-cascader style="width: 100%;"
          id={item.key}
          allowClear
          changeOnSelect
          fieldNames={item.fieldNames}
          options={item.options}
          placeholder={item.placeholder}
          on-change={(e: Array<string>) => this.levelcodeChange(e, item.key)}></a-cascader>;
        break;
      case 'datetime':
        itemDom = <a-date-picker
          id={item.key}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder={item.placeholder}>
        </a-date-picker>;
        break;
      case 'date':
        itemDom = <a-date-picker
          id={item.key}
          format="YYYY-MM-DD"
          placeholder={item.placeholder}>
        </a-date-picker>;
        break;
      case 'datetimerange':
        itemDom = <a-range-picker
          style="width: 100%"
          id={item.key}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          disabledTime={item.disabledTime}
          on-change={(e: Array<Date>) => this.rangeChange(e, item.value ? item.value : [])}
          placeholder={item.placeholder}>
        </a-range-picker>;
        break;
      case 'checkboxButton':
        itemDom = <el-radio-group
          on-change={item.change}
          size="small">
          {
            item.options && item.options.map((
              items,
              indexs: number,
            ) => <a-radio-button
              value={items.value}
              key={indexs}>
                {items.label}
              </a-radio-button>)
          }
        </el-radio-group>;
        break;
      default: break;
    }
    if (grade) {
      return (
        <a-col {...{ props: this.gradeLayout }} key={index}>
          <a-form-item {...{ props: this.formItemLayout }} label={item.label}>
            {getFieldDecorator(item.key)(itemDom)}
          </a-form-item>
        </a-col>
      );
    }
    return (
      <a-col {...{ props: this.nomalLayout }} key={index}>
        <a-form-item>
          {
            getFieldDecorator(item.key)(itemDom)
          }
        </a-form-item>
      </a-col>
    );
  }

  nomalLayout = {
    span: 4,
    xl: 3,
    lg: 3,
    md: 4,
    sm: 8,
    xs: 12,
  }

  gradeLayout = {
    span: 8,
    xl: 8,
    lg: 8,
    md: 12,
    sm: 12,
    xs: 12,
  }

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      md: { span: 8 },
      lg: { span: 6 },
      xl: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
      md: { span: 16 },
      lg: { span: 18 },
      xl: { span: 18 },
    },
  }

  // 时间区间赋值操作
  rangeChange(data: any, value: string[]) {
    this.params[value[0]] = data[0].format('YYYY-MM-DD hh:mm:ss');
    this.params[value[1]] = data[1].format('YYYY-MM-DD hh:mm:ss');
  }

  render() {
    const { getFieldDecorator } = this.form as any;
    const { isMobile } = this.$store.state.app;
    return (
      <div class={`filter-wrap ${this.showGrade ? 'showGrade' : ''}`}>
        <div class="filter-mormal" ref="filterNormal">
          <a-form layout="inline">
            <a-row gutter={20}>
              {
                this.filterList.map((item, index) => this.formItem(getFieldDecorator, item, index))
              }
              <a-col class="btn-wrap" xl={this.btnXl} lg={this.btnlg} md={this.btnmd ? this.btnmd : 24} sm={24} xs={24}>
                {this.btnElement(true)}
              </a-col>
            </a-row>
          </a-form>
        </div>
        {
          this.filterGrade.length
            ? <div class="filter-grade" ref="filterGrade" id="filter-grade">
              <a-form>
                <a-row gutter={20}>
                  {
                    this.filterGrade.map((item, index) => this.formItem(getFieldDecorator, item, index, true))
                  }
                  <a-col class="btn-wrap" span={24} sm={24} xs={24}>
                    {this.btnElement(false)}
                  </a-col>
                </a-row>
              </a-form>
            </div> : null
        }
        <a-modal id="tableSet" width="500px" title="Table Setting" visible={this.setModel} on-ok={this.setTable} on-cancel={this.closeModal}>
          <a-checkbox-group class="checkbox-list" v-model={this.checkList}>
            {
              this.tableList.map((item, index) => <a-checkbox key={index} value={item.dataIndex}>
                {item.title}</a-checkbox>)
            }
          </a-checkbox-group>
        </a-modal>
      </div>
    );
  }

  setTable() {
    if (this.checkList.length > 0) {
      window.localStorage.setItem(this.localName, this.checkList.join(','));
      this.$emit('setTable', this.checkList);
      this.setModel = false;
    } else {
      this.$message.error('At least one column！');
    }
  }

  btnElement(isNormal: boolean): JSX.Element {
    return (
      <div>
        <a-button type="primary" on-click={this.onSearch} id="tableSearch" icon="search">Search</a-button>
        <a-button type="primary" on-click={this.reset} id="tableReset" icon="reload">Reset</a-button>
        {
          this.filterGrade.length ? <a on-click={() => this.gradeSwitch(isNormal)} class="grade-btn">{isNormal ? 'Common' : 'Senior'} Search{isNormal ? <i class="iconfont-down"></i> : <i class="iconfont-up"></i>}</a> : null
        }
        <div class="right-btn">
          {
            this.addBtn ? <a-button on-click={this.addFun} id={isNormal ? 'tableAdd' : 'tableAdd2'} icon="plus">Add</a-button> : null
          }
          {
            this.exportBtn ? <a-button on-click={this.addFun} id={isNormal ? 'tableExport' : 'tableExport2'} icon="download" shape="circle"></a-button> : null
          }
          <a-button on-click={this.openSetting} id="tableSet" icon="setting" shape="circle"></a-button>
        </div>
      </div>
    );
  }
}
const MFilter = Form.create({
  props: {
    filterList: Array,
    filterGrade: Array,
    filterParams: Object,
    addBtn: Boolean,
    exportBtn: Boolean,
    exportFun: Function,
    tableList: Array,
    labelWidth: String,
  },
})(MFilterClass);
export default MFilter;
