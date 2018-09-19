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

const database = BaseInfoData.list;

module.exports = {
  baseInfoList(req, res) {
    let { pageSize, page, ...other } = req.body;
    pageSize = pageSize || 10;
    page = page || 1;
    other = { ...other };

    let newData = database;
    for (const key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1);
            } else if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime();
              const end = new Date(other[key][1]).getTime();
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
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    };
    const data = baseData('success', '查询成功');
    data.entity = list;
    setTimeout(() => {
      res.status(200).json(data);
    }, 2000);
  },
};

