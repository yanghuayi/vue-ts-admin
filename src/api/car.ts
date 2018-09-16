import request from '@/utils/request';

// 车型配置
// 配置启用
export async function vehicleModelEnable(params: any) {
  return request({
    url: '/vehicle/model/enable',
    method: 'get',
    data: params,
  });
}

// 新增配置
export async function vehicleModelAdd(params: any) {
  return request({
    url: '/vehicle/model/add',
    method: 'post',
    data: params,
  });
}

// 新增配置
export async function vehicleModelUpdate(params: any) {
  return request({
    url: '/vehicle/model/update',
    method: 'post',
    data: params,
  });
}

// 按照id查询配置详情
export async function vehicleModelInfo(params: any) {
  return request({
    url: '/vehicle/model/info',
    method: 'get',
    data: params,
  });
}

