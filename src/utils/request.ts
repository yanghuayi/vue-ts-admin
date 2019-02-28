/* global window */
import axios from 'axios';
import qs from 'qs';
import jsonp from 'jsonp';
import lodash from 'lodash';
import pathToRegexp from 'path-to-regexp';
import { message } from 'ant-design-vue';
import config from '@/utils/config';
import router from '@/router';

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/monitor' : '/api', // api的base_url
  timeout: 20000, // 请求超时时间
  headers: {
    token: window.localStorage.getItem('token'),
  },
});

const fetch = (options: {
url: string,
method: string,
data?: object,
fetchType?: string,
headers?: any,
}) => {
  const { data } = options;
  let { url } = options;
  const { method = 'get', fetchType } = options;
  options.headers = {
    ...options.headers,
    token: window.localStorage.getItem('token'),
  };
  let cloneData: any = lodash.cloneDeep(data);
  cloneData = qs.stringify(cloneData);

  try {
    const domins = url.match(/[a-zA-z]+:\/\/[^/]*/);
    if (domins) {
      url = url.slice(domins[0].length);
    }
    const match = pathToRegexp.parse(url);
    url = pathToRegexp.compile(url)(data);
    match.map((item: any) => {
      if (typeof item === 'object') {
        if (item instanceof Object && item.name in cloneData) {
          delete cloneData[item.name];
        }
      }
      return true;
    });
    url = domins ? domins[0] + url : url;
  } catch (e) {
    message.error(e.message);
  }

  if (fetchType === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: `${qs.stringify(data)}&callback`,
        name: `jsonp_${new Date().getTime()}`,
        timeout: 4000,
      }, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve({ statusText: 'OK', status: 200, data: result });
      });
    });
  } if (fetchType === 'YQL') {
    url = `http://query.yahooapis.com/v1/public/yql?q=select * from json where url='${options.url}?${encodeURIComponent(qs.stringify(options.data))}'&format=json`;
  } else if (fetchType === 'JSON') {
    return service({
      url,
      method: method.toLowerCase(),
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
  }
  switch (method.toLowerCase()) {
    case 'post':
      return service.post(url, cloneData, { headers: options.headers });
    case 'get':
      return service.get(`${url}?${cloneData}`, { headers: options.headers });
    default:
      return service.get(`${url}?${cloneData}`, { headers: options.headers });
  }
};

interface Option {
  url: string,
  method: string,
  data?: object,
  fetchType?: string,
  headers?: any,
}

export default function request(options: Option): Promise<any> {
  return fetch(options).then((response: any) => {
    const { statusText, status } = response;
    let { data } = response;
    if (data instanceof Array) {
      data = {
        list: data,
      };
    }
    if (response.data.result && response.data.result.resultCode === 3) {
      if (config.noLoginList.indexOf(window.location.hash) < 0) {
        router.replace('/login');
      }
      return Promise.reject(new Error(response.data.result.resultMessage));
    }
    return Promise.resolve({
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    });
  }).catch((error) => {
    const { response } = error;
    let msg;
    let statusCode;
    if (response && response instanceof Object) {
      const { data, statusText } = response;
      statusCode = response.status;
      msg = data.message || statusText;
    } else {
      statusCode = 600;
      msg = error.message || 'Network Error';
    }
    message.error(msg);
    return Promise.reject(new Error(msg));
  });
}
