import request from '@/utils/request';

// 商户新增
export async function customerAdd(params: any) {
  return request({
    url: '/sys/org/save',
    method: 'post',
    data: params,
    fetchType: 'JSON',
  });
}
// 商户修改
export async function customerUpdate(params: any) {
  return request({
    url: '/sys/org/update',
    method: 'post',
    fetchType: 'JSON',
    data: params,
  });
}
// 商户冻结
export async function customerLock(params: any) {
  return request({
    url: `/sys/org/lock/${params}`,
    method: 'get',
  });
}
// 商户解冻
export async function customerUnlock(params: any) {
  return request({
    url: `/sys/org/unlock/${params}`,
    method: 'get',
  });
}
// 检查商户名是否存在
export async function checkOrgName(params: any) {
  return request({
    url: `/sys/org/check/${params}`,
    method: 'get',
  });
}
// 所有商户列表
export async function getCustomerList(params: any) {
  return request({
    url: '/customer/org/list',
    method: 'get',
    fetchType: 'JSON',
  });
}
