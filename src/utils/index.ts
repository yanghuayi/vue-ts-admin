export function param2Obj(url: string): { token?: string } {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(`{"${decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
}

export function routeToArray(route: string): { routeArr: string[], params: string } {
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

export function levelcodeToArray(levelcode: string) {
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

export function numFormat(num: number) {
  return num.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,');
}

export const loadApexCharts = () => new Promise(((resolve, reject) => {
  if (window.ApexCharts) {
    resolve(window.ApexCharts);
  }
  const script: any = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '/apexcharts.min.js';
  script.onerror = reject;
  const { head } = document;
  if (head) {
    head.appendChild(script);
  }
  script.onload = function onload() {
    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      resolve(window.ApexCharts);
    }
    script.onload = null;
    script.onreadystatechange = null;
  };
  script.onreadystatechange = script.onload;
}));

export const loadBmap = () => new Promise(((resolve, reject) => {
  if (!window.BMap) {
    const script: any = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//api.map.baidu.com/getscript?v=2.0&ak=3oWu5SgExpeyXtRXbuDdRO08CoVMTloM&s=1';
    script.onerror = reject;
    const { head } = document;
    if (head) {
      head.appendChild(script);
    }
    script.onload = function onload() {
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        resolve(window.BMap);
      }
      script.onload = null;
      script.onreadystatechange = null;
    };
    script.onreadystatechange = script.onload;
  } else {
    resolve(window.BMap);
  }
}));

export const loadCanvasLayer = () => new Promise(((resolve, reject) => {
  const script: any = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '/canvaslayer.js';
  script.onerror = reject;
  const { head } = document;
  if (head) {
    head.appendChild(script);
  }
  script.onload = function onload() {
    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      resolve(window.CanvasLayer);
    }
    script.onload = null;
    script.onreadystatechange = null;
  };
  script.onreadystatechange = script.onload;
}));

export const loadMapInfoBox = () => new Promise(((resolve, reject) => {
  const script: any = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '//api.map.baidu.com/library/InfoBox/1.2/src/InfoBox_min.js';
  script.onerror = reject;
  const { head } = document;
  if (head) {
    head.appendChild(script);
  }
  script.onload = function onload() {
    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      resolve();
    }
    script.onload = null;
    script.onreadystatechange = null;
  };
  script.onreadystatechange = script.onload;
}));
