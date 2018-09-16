import request from '@/utils/request';

// 告警消息
// 处理告警
export async function handleAlarm(params: any) {
  return request({
    url: '/msg/alarm/handle',
    method: 'post',
    data: params,
  });
}

// 通知公告
// 新增
export async function noticeAdd(params: any) {
  return request({
    url: '/msg/notice/publish',
    method: 'post',
    data: params,
  });
}
// 删除
export async function noticeDelete(params: any) {
  return request({
    url: '/msg/notice/delete',
    method: 'post',
    data: params,
  });
}
