import request from '@/utils/request';

// 配置详情
export async function configInfo(params: any) {
  return request({
    url: '/vehicle/config/info',
    method: 'post',
    data: params,
  });
}

// 新增配置
export async function configAdd(params: any) {
  return request({
    url: '/vehicle/config/add',
    method: 'post',
    data: params,
  });
}

// 修改配置
export async function configUpdate(params: any) {
  return request({
    url: '/vehicle/config/update',
    method: 'post',
    data: params,
  });
}

// 删除配置
export async function configDelete(params: any) {
  return request({
    url: '/vehicle/config/delete',
    method: 'post',
    data: params,
  });
}
