import request from '@/utils/request';

// 告警配置
export async function getAlarmSetting(params: any) {
  return request({
    url: '/alarmcfg/list',
    method: 'get',
    data: params,
  });
}

// 告警模板
export async function getAlarmModelList(params: any) {
  return request({
    url: '/alarmcfg/model',
    method: 'get',
    data: params,
  });
}

