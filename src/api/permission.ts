import request from '@/utils/request';

// 角色管理
// 角色列表
export async function getRolesList(params: any) {
  return request({
    url: '/sys/role/select',
    method: 'get',
    fetchType: 'JSON',
    data: params,
  });
}
// 角色新增
export async function roleAdd(params: any) {
  return request({
    url: '/sys/role/save',
    method: 'post',
    fetchType: 'JSON',
    data: params,
  });
}
// 角色修改
export async function roleUpdate(params: any) {
  return request({
    url: '/sys/role/update',
    method: 'post',
    data: params,
  });
}
// 角色启用
export async function roleUnlock(params: any) {
  return request({
    url: '/sys/role/unlock',
    method: 'post',
    fetchType: 'JSON',
    data: params,
  });
}
// 角色禁用
export async function roleLock(params: any) {
  return request({
    url: '/sys/role/lock',
    method: 'post',
    fetchType: 'JSON',
    data: params,
  });
}

// 获取登录的用户信息
export async function getUserInfo(params: any) {
  return request({
    url: '/sys/user/info',
    method: 'get',
    data: params,
  });
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 成员管理
// 成员解冻
export async function userUnlock(params: any) {
  return request({
    url: '/sys/user/unlock',
    method: 'post',
    fetchType: 'JSON',
    data: params,
  });
}
// 成员冻结
export async function userLock(params: any) {
  return request({
    url: '/sys/user/lock',
    method: 'post',
    fetchType: 'JSON',
    data: params,
  });
}
// 成员修改
export async function userUpdate(params: any) {
  return request({
    url: '/sys/user/update',
    method: 'post',
    data: params,
  });
}
// 成员新增
export async function userAdd(params: any) {
  return request({
    url: '/sys/user/save',
    method: 'post',
    data: params,
  });
}
// 检测成员是否存在
export async function userCheck(params: any) {
  return request({
    url: `/sys/user/exist/${params}`,
    method: 'post',
  });
}

