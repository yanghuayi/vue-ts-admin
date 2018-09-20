import { Component, Vue } from 'vue-property-decorator';
import { Tag } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';
import city from '@/utils/city';

import './index.less';

@Component({
  components: {
  'a-tag': Tag,
  }
  })
export default class BaseInfo extends Vue {
  filterParams: any = {
    name: '',
    address: [],
    createtime: [],
    startTime: '',
    endTime: '',
  }
  BackParams: any = {
    code: 'data.result.resultCode',
    codeOK: 0,
    message: 'data.result.resultMessage',
    data: 'data.entity.data',
    total: 'data.entity.total',
  }
  outParams: any = {}
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
  ]
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
  ]
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
  ]

  genderRender(text: any) {
    return <a-tag color={text ? 'blue': 'purple'}>{text ? 'Male' : 'Female'}</a-tag>;
  }

  tableClick(key: string, row: any) {
    console.log(key, row);
  }

  render() {
    return (
      <div class="baseInfo-wrap">
        <filter-table
          tableList={this.tableList}
          filterList={this.filterList}
          filterGrade={[]}
          url={'/customers/baseInfoList'}
          filterParams={this.filterParams}
          outParams={this.outParams}
          addBtn={true}
          exportBtn={false}
          dataType={'json'}
          rowKey={'id'}
          opreat={this.opreat}
          fetchType={'post'}
          BackParams={this.BackParams}
          on-menuClick={this.tableClick}
        >
        </filter-table>
      </div>
    );
  }
}
