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

const loadMap = () => new Promise(((resolve, reject) => {
  if (!window.BMap) {
    const script: any = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://api.map.baidu.com/getscript?v=2.0&ak=K52pNzWT61z1EHvdZptaSmlPRc7mKbjC&ser' +
      'vices=&t=20180629105706';
    script.onerror = reject;
    document
      .head
      .appendChild(script);
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

const loadMapLib = () => new Promise(((resolve, reject) => {
  const script: any = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js';
  script.onerror = reject;
  document
    .head
    .appendChild(script);
  script.onload = function onload() {
    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      resolve(window.BMapLib);
    }
    script.onload = null;
    script.onreadystatechange = null;
  };
  script.onreadystatechange = script.onload;
}));

const loadMapTextIcon = () => new Promise(((resolve, reject) => {
  const script: any = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js';
  script.onerror = reject;
  document
    .head
    .appendChild(script);
  script.onload = function onload() {
    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      resolve();
    }
    script.onload = null;
    script.onreadystatechange = null;
  };
  script.onreadystatechange = script.onload;
}));
const loadMapInfoBox = () => new Promise(((resolve, reject) => {
  const script: any = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://api.map.baidu.com/library/InfoBox/1.2/src/InfoBox_min.js';
  script.onerror = reject;
  document
    .head
    .appendChild(script);
  script.onload = function onload() {
    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      resolve();
    }
    script.onload = null;
    script.onreadystatechange = null;
  };
  script.onreadystatechange = script.onload;
}));

const loadDrawScript = () => new Promise(((resolve, reject) => {
  const script: any = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js';
  script.onerror = reject;
  const link: any = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css';
  document
    .head
    .appendChild(link);
  script.onload = function onload() {
    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      // map ok
      console.log('load DrawingManager ok');
      resolve(window.BMapLib);
    }
    script.onload = null;
    script.onreadystatechange = null;
  };
  script.onreadystatechange = script.onload;
}));

const loadCanvasLayer = () => new Promise(((resolve, reject) => {
  const script: any = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '/canvaslayer.js';
  script.onerror = reject;
  document
    .head
    .appendChild(script);
  script.onload = function onload() {
    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      resolve(window.CanvasLayer);
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
  loadMap,
  loadMapLib,
  loadMapTextIcon,
  loadCanvasLayer,
  loadMapInfoBox,
  loadDrawScript,
};
