import axios from 'axios';
import request from '@/utils/request';

export async function vehicleInfo(params: any) {
  return request({
    url: '/vehicle/monitor/info',
    method: 'get',
    data: params,
  });
}

export async function vehicleUpdate(params: any) {
  return request({
    url: '/vehicle/monitor/edit',
    method: 'post',
    fetchType: 'JSON',
    data: params,
  });
}

export async function vehicleDelete(params: any) {
  return request({
    url: '/vehicle/monitor/delete',
    method: 'post',
    data: params,
  });
}

export async function vehicleRadiusQuery(params: any) {
  return request({
    url: '/vehicle/monitor/radiusQuery',
    method: 'get',
    data: params,
  });
}
