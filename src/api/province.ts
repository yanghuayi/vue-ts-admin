import request from '@/utils/request';

// 获取省
export async function getProvince(params: any) {
  return request({
    url: '/area/province',
    method: 'get',
    data: params,
  });
}

// 获取市
export async function getCity(params: any) {
  return request({
    url: '/area/city',
    method: 'get',
    data: params,
  });
}

// 获取区县
export async function getDistrict(params: any) {
  return request({
    url: '/area/district',
    method: 'get',
    data: params,
  });
}

