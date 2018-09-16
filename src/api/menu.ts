import request from '@/utils/request';

// 获得全部权限列表
export async function getMenuList(params: any) {
  return request({
    url: '/sys/menu/list',
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

