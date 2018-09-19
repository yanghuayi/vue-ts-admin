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
    addressArr: [],
    createtime: [],
  }
  BackParams: any = {
    code: 'result.resultCode',
    codeOK: '0',
    message: 'result.resultMessage',
    data: 'entity.data',
    total: 'entity.total',
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
      options: city,
    },
  ]
  tableList: tableList[] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Nickname',
      dataIndex: 'nickname',
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
      customRender(text: any) {
        return <el-tag color={text ? 'blue': 'purple'}>{text ? '男' : '女'}</el-tag>;
      },
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
      rowKey: 'edit',
      color: 'blue',
      text: '编辑',
      roles: true,
    },
  ]
  render() {
    return (
      <div class="baseInfo-wrap">
        <filter-table
          tableList={this.tableList}
          filterList={this.filterList}
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
        >
        </filter-table>
      </div>
    );
  }
}
