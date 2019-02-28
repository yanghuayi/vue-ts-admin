const Mock = require('mockjs');

const baseData = require('./baseData');

const BaseInfoData = Mock.mock({
  'list|100': [
    {
      id: '@id',
      name: '@name',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      birthDate: '@datetime',
      createTime: '@datetime',
    },
  ],
});

let database = BaseInfoData.list;

module.exports = {
  baseInfoList(req, res) {
    let { pageSize, pageNum, ...other } = req.body;
    pageSize = pageSize || 10;
    pageNum = pageNum || 1;
    other = { ...other };

    let newData = database;
    for (const key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1);
            } if (key === 'startTime' || key === 'endTime') {
              const start = new Date(other.startTime).getTime();
              const end = new Date(other.endTime).getTime();
              const now = new Date(item[key]).getTime();

              if (start && end) {
                return now >= start && now <= end;
              }
              return true;
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1;
          }
          return true;
        });
      }
    }
    const list = {
      data: newData.slice((pageNum - 1) * pageSize, pageNum * pageSize),
      total: newData.length,
    };
    const data = baseData('success', '查询成功');
    data.entity = list;
    setTimeout(() => {
      res.status(200).json(data);
    }, 2000);
  },
  delete(req, res) {
    const { ids } = req.body;
    database = database.filter(item => !ids.some(_ => _ === item.id));
    res.status(204).end();
  },
  update(req, res) {
    const editItem = req.body;
    let isExist = false;

    database = database.map((item) => {
      if (item.id === editItem.id) {
        isExist = true;
        return Object.assign({}, item, editItem);
      }
      return item;
    });

    if (isExist) {
      res.json(baseData('success', '更新成功！'));
    } else {
      res.json(baseData('error', '未找到对应数据！'));
    }
  },
  add(req, res) {
    const newData = req.body;
    newData.createTime = Mock.mock('@now');
    newData.id = Mock.mock('@id');

    database.unshift(newData);

    res.json(baseData('success', '新增成功！'));
  },
};
