import request from '@/utils/request';

// 设备绑定
export async function terminalBind(params: any) {
  return request({
    url: '/device/terminal/bind',
    method: 'post',
    data: params,
  });
}

// 设备解绑
export async function terminalUnbind(params: any) {
  return request({
    url: `/device/terminal/unbind/${params}`,
    method: 'post',
  });
}

// 设备添加
export async function terminalAdd(params: any) {
  return request({
    url: '/device/terminal/save',
    method: 'post',
    data: params,
  });
}

// 设备验收
export async function terminalCheck(params: any) {
  return request({
    url: '/device/terminal/confirm',
    method: 'post',
    data: params,
  });
}

// 获取设备类型
export async function terminalType(params: any) {
  return request({
    url: '/device/terminal/clienttypes',
    method: 'post',
    data: params,
  });
}

// 设备配置更新
export async function terminalCfg(params: any) {
  return request({
    url: `/device/terminal/cfg/${params}`,
    method: 'get',
  });
}

// 查询车辆列表
export async function getCarList(params: any) {
  return request({
    url: '/device/vehicle/list',
    method: 'post',
    data: params,
  });
}

// 查询车辆列表
export async function findCar(params: any) {
  return request({
    url: '/device/vehicle/platenum',
    method: 'get',
    data: params,
  });
}
