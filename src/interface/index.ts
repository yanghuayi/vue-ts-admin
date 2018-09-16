import { Column } from 'ant-design-vue';

// 筛选表单
type FilterType = 'input' | 'select' | 'cascader' | 'levelcode' | 'datetime' | 'date' | 'datetimerange' | 'checkboxButton';
export interface FilterFormList {
  key: string;
  type: FilterType;
  label: string;
  placeholder: string | string[];
  value?: string[];
  fieldNames?: any;
  options?: Array<{ value: any, label: string }>;
  change?: Function;
  disabledTime?: (dates: [object, object], partial: 'start'|'end') => any;
}

export interface TableColumnFilter {
  text: string,
  value: any
}
// column
export interface tableList extends Column {}
// 操作
export interface Opreat {
  key: string,
  rowKey: string,
  color: Function | string,
  text: Function | string,
  disabled?: Function;
  roles: Function | boolean,
  msg?: Function | string,
}
// 表格数据
export interface tableTag {
  key: number,
  color: string,
  value: number,
  label: string,
}

export interface menuItem {
  id: number,
  title: string,
  url?: string,
  icon?: string,
  permission: string | Array<string> | boolean,
  children?: Array<menuItem>,
}

export interface MockConfig {
  url: string,
  headers: any,
  body: string,
}

export interface routerItem {
  name?: string,
  component?: any,
  path: string,
  icon?: string,
  hidden?: boolean,
  permission?: string | string[] | boolean,
  redirect?: string | object,
  children?: routerItem[],
  meta?: any,
}

export interface Directives {
  name: string,
  value: any,
  modifiers: object,
}
type CoordinateSystem = 'bd09ll' | 'gcj02ll';
export interface MapCarData {
  id: string,
  direction: number,
  lat: number,
  lng: number,
  plateNum: string,
  speed: number,
  coordinateSystem: CoordinateSystem,
}
// 坐标
export interface Point {
  lng: number,
  lat: number,
}
