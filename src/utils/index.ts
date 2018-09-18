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

export default {
  param2Obj,
  levelcodeToArray,
  routeToArray,
};
