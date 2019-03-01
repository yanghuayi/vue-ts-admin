<template>
  <div class="filter-table">
    <m-filter
      ref="MFilter"
      :filter-list="filterList"
      :filter-grade="filterGrade"
      :filter-params="filterParams"
      :table-list="defalutTableList"
      :add-btn="addBtn"
      :export-btn="exportBtn"
      :local-name="localName"
      @search="searchFun"
      @export="exportBack"
      @clearOut="clearFun"
      @setTable="setTable"
      @addFun="addBack"
      @tableHeight="tableHeight"
    />
    <m-table
      ref="MTable"
      :table-list="changeTableList"
      :url="url"
      :data-type="dataType"
      :row-key="rowKey"
      :opreat="opreat"
      :out-params="outParams"
      :opreat-width="opreatWidth"
      :back-params="backParams"
      :local-name="localName"
      :fetch-type="fetchType"
      :fetch-error="fetchError"
      :table-params="tableParams"
      :default-page-size="defaultPageSize"
      :highlight-current-row="highlightCurrentRow"
      :scroll="scroll"
      @tableClick="tableClick"
      @selectChange="selectChange"
      @currentChange="currentChange"
    />
  </div>
</template>

<script lang="ts">
import {
  Prop, Emit, Vue, Component,
} from 'vue-property-decorator';
import { FilterFormList, tableList, Opreat } from '@/interface/index';
import MFilter from './MFilter';
import MTable from './MTable';

@Component({
  components: {
    'm-filter': MFilter,
    'm-table': MTable,
  },
})
export default class FilterTable extends Vue {
  // 筛选表单生成参数
  @Prop({ default: [] }) private filterList!: FilterFormList[];

  // 筛选表单高级生成参数
  @Prop({ default: [] }) private filterGrade!: FilterFormList[];

  // 筛选表单存储数据参数
  @Prop({ default: {} })
  private filterParams!: any;

  // 外部参数
  @Prop({ default: {} })
  private outParams!: any;

  // 是否展示新增按钮
  @Prop({ default: false }) private addBtn!: boolean;

  // 是否展示导出按钮
  @Prop({ default: false }) private exportBtn!: boolean;

  // 表格参数
  @Prop({ default: [] }) private tableList!: tableList[];

  // 请求数据地址
  @Prop({ default: '' }) private url!: string;

  // 请求数据类型
  @Prop({ default: 'formData' })
  private dataType!: string;

  // 表格行ID
  @Prop({ default: 'id' }) private rowKey!: string;

  // 操作参数
  @Prop({ default: [] }) private opreat!: Opreat[];

  // 操作栏width
  @Prop({ default: '100px' }) private opreatWidth!: string;

  // 本地存储字段名
  @Prop({ default: 'filterTable' }) private localName!: string;

  // 请求错误回调事件
  @Prop() private fetchError!: string;

  // 默认分页数量
  @Prop({ default: 10 }) private defaultPageSize!: number;

  // 数据返回格式
  @Prop() private backParams!: object;

  // 请求数据方法
  @Prop({ default: 'json' }) private fetchType!: string;

  @Prop({ default: false }) private highlightCurrentRow!: boolean;

  @Prop({ default: null }) private scroll!: {x: number, y: number};

  // 初始化请求参数
  tableParams: any = Object.assign(this.filterParams, this.outParams);

  defalutTableList: tableList[] = this.tableList.filter(item => true);

  changeTableList: tableList[];

  constructor(props: any) {
    super(props);
    const self = this;
    const saveList = window.localStorage.getItem(this.localName);
    if (saveList) {
      const checkList = saveList.split(',');
      const filterList = this.defalutTableList.filter((item, index) => checkList.indexOf(item.dataIndex) > -1);
      this.changeTableList = filterList;
    } else {
      this.changeTableList = this.tableList.filter(item => true);
    }
  }

  @Emit()
  clearFun() {
    this.$emit('clearOutParams');
  }

  reloadTable() {
    const table: any = this.$refs.MTable;
    // 延迟100ms加载数据
    setTimeout(() => {
      table.reload();
    }, 100);
  }

  @Emit()
  searchFun(params: any) {
    this.tableParams = params;
    const table: any = this.$refs.MTable;
    // 延迟100ms加载数据
    setTimeout(() => {
      table.reload();
    }, 100);
  }

  @Emit()
  addBack() {
    this.$emit('add');
  }

  @Emit()
  tableHeight(params: any) {
    const table: any = this.$refs.MTable;
    table.$el.style.marginTop = `${params - 48}px`;
  }

  @Emit()
  exportBack() {
    this.$emit('exportBack');
  }

  @Emit()
  @Emit()
  setTable(list: Array<string>) {
    const filterList = this.defalutTableList.filter((item, index) => list.indexOf(item.dataIndex) > -1);
    this.changeTableList = filterList;
  }

  @Emit()
  tableClick(key: string, row: any) {
    this.$emit('menuClick', key, row);
  }

  @Emit()
  selectChange(val: any) {
    this.$emit('selectChange', val);
  }

  @Emit()
  currentChange(val: any) {
    this.$emit('currentChange', val);
  }
}
</script>

<style lang="less" scoped>
.filter-table {
  overflow: hidden;
  min-height: e("calc(100vh - 100px)");
}
</style>
