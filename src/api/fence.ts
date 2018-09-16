import request from '@/utils/request';

// 围栏详情
export async function getFenceDetail(params: any) {
  return request({
    url: '/fence/detail',
    method: 'post',
    data: params,
  });
}

// 启用围栏
export async function enableFence(params: any) {
  return request({
    url: '/fence/enable',
    method: 'post',
    data: params,
  });
}

// 禁用围栏
export async function disableFence(params: any) {
  return request({
    url: '/fence/disable',
    method: 'post',
    data: params,
  });
}

// 删除围栏
export async function deleteFence(params: any) {
  return request({
    url: '/fence/delete',
    method: 'post',
    data: params,
  });
}

// 新增围栏
export async function addFence(params: any) {
  return request({
    url: '/fence/add',
    method: 'post',
    data: params,
  });
}

// 编辑围栏
export async function updateFence(params: any) {
  return request({
    url: '/fence/update',
    method: 'post',
    data: params,
  });
}
