import { Component, Vue } from 'vue-property-decorator';
import { Tag } from 'ant-design-vue';
import { tableList } from '@/interface';

import './index.less';

@Component({
  components: {
  'a-tag': Tag,
  }
  })
export default class BaseInfo extends Vue {
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
      title: 'Login name',
      dataIndex: 'loginName',
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Birth date',
      dataIndex: 'birthDate',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      customRender(text: string) {
        return <el-tag color={text === '男' ? 'blue': 'purple'}>{text}</el-tag>;
      },
    },
    {
      title: 'ID number',
      dataIndex: 'idNumber',
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
  render() {
    return (
      <div class="baseInfo-wrap">
        <filter-table
          tableList={this.tableList}
        >
        </filter-table>
      </div>
    );
  }
}
