function param2Obj(url: string): { token?: string } {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(`{"${decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
}

function routeToArray(route: string): { routeArr: string[], params: string } {
  if (!route) {
    return {
      routeArr: [],
      params: '',
    };
  }
  const arr: string[] = route.split('/');
  const ret: string[] = [];
  let params = '';
  arr.shift();
  arr.forEach((item, index) => {
    if (parseInt(item, 10)) {
      params = item;
      return;
    }
    ret.push(index ? item : `/${item}`);
  });
  return {
    routeArr: ret,
    params,
  };
}

function levelcodeToArray(levelcode: string) {
  if (!levelcode) {
    return [];
  }
  const arr: string[] = levelcode.split('/');
  const ret: string[] = [];
  arr.length -= 1;
  arr.forEach((itm) => {
    ret.push(ret[ret.length - 1] ? `${ret[ret.length - 1] + itm}/` : `${itm}/`);
  });
  return ret;
}

function numFormat(num: number) {
  return num.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,');
}

export const loadApexCharts = () => new Promise(((resolve, reject) => {
  if (window.ApexCharts) {
    resolve(window.ApexCharts);
  }
  const script: any = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '/apexcharts.js';
  script.onerror = reject;
  document
    .head
    .appendChild(script);
  script.onload = function onload() {
    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      resolve(window.ApexCharts);
    }
    script.onload = null;
    script.onreadystatechange = null;
  };
  script.onreadystatechange = script.onload;
}));

export default {
  param2Obj,
  levelcodeToArray,
  routeToArray,
  numFormat,
};
