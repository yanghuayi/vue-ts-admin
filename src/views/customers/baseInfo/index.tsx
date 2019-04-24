import { Component, Vue } from 'vue-property-decorator';
import { Tag } from 'ant-design-vue';
import moment from 'moment';
import { tableList, FilterFormList, Opreat } from '@/interface';
import city from '@/utils/city';

import InfoModal from './infoModal';

import './index.less';

@Component({
  name: 'BaseInfo',
  components: {
    'a-tag': Tag,
    'info-modal': InfoModal,
  },
})
export default class BaseInfo extends Vue {
  filterParams: any = {
    name: '',
    address: [],
    createtime: [],
    startTime: '',
    endTime: '',
  };

  BackParams: any = {
    code: 'data.result.resultCode',
    codeOK: 0,
    message: 'data.result.resultMessage',
    data: 'data.entity.data',
    total: 'data.entity.total',
  };

  outParams: any = {};

  filterList: FilterFormList[] = [
    {
      key: 'name',
      label: 'name',
      type: 'input',
      placeholder: 'Seach Name',
    },
    {
      key: 'address',
      label: 'address',
      type: 'cascader',
      placeholder: 'Seach address',
      options: city,
    },
    {
      key: 'createtime',
      label: 'Createtime',
      type: 'datetimerange',
      placeholder: ['start date', 'end date'],
      value: ['startTime', 'endTime'],
    },
  ];

  tableList: tableList[] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Nickname',
      dataIndex: 'nickName',
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'Phone number',
      dataIndex: 'phone',
    },
    {
      title: 'Birth date',
      dataIndex: 'birthDate',
    },
    {
      title: 'Gender',
      dataIndex: 'isMale',
      customRender: this.genderRender,
    },
    {
      title: 'ID number',
      dataIndex: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  opreat: Opreat[] = [
    {
      key: 'edit',
      rowKey: 'id',
      color: 'blue',
      text: '编辑',
      roles: true,
    },
    {
      key: 'delete',
      rowKey: 'id',
      color: 'red',
      text: '删除',
      roles: true,
      msg: '确定删除？',
    },
  ];

  title: string = 'add customer';

  visible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  genderRender(text: any) {
    return <a-tag color={text ? 'blue' : 'purple'}>{text ? 'Male' : 'Female'}</a-tag>;
  }

  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    data.address = data.address.split(' ');
    data.birthDate = moment(data.birthDate, 'YYYY-MM-DD HH:mm:ss');
    switch (key) {
      case 'edit':
        this.editData = data;
        this.visible = true;
        this.modelType = 'edit';
        break;
      default:
        break;
    }
  }

  add() {
    this.title = 'Add customer';
    this.modelType = 'add';
    this.visible = true;
    this.editData = {};
  }

  closeModal() {
    this.visible = false;
    this.editData = {};
  }

  success() {
    this.visible = false;
    const Table: any = this.$refs.baseInfoTable;
    this.editData = {};
    Table.reloadTable();
  }

  render() {
    return (
      <div class="baseInfo-wrap">
        <filter-table
          ref="baseInfoTable"
          tableList={this.tableList}
          filterList={this.filterList}
          filterGrade={[]}
          scroll={{ x: 900 }}
          url={'/customers/baseInfoList'}
          filterParams={this.filterParams}
          outParams={this.outParams}
          addBtn={true}
          exportBtn={false}
          dataType={'json'}
          rowKey={'id'}
          opreat={this.opreat}
          fetchType={'post'}
          backParams={this.BackParams}
          on-menuClick={this.tableClick}
          on-add={this.add}
        />
        <info-modal
          title={this.title}
          visible={this.visible}
          type={this.modelType}
          data={this.editData}
          on-close={this.closeModal}
          on-success={this.success}
        />
      </div>
    );
  }
}
