const Mock = require('mockjs');
const baseData = require('./baseData');
const Dashboard = Mock.mock({
  'projections|12': ['@integer(30, 90)'],
  'actuals|12': ['@integer(30, 90)'],
  'dataList|4': [
    {
      'name|+1': ['Customers', 'Orders', 'Revenue', 'Growth'],
      'value|+1': ['@integer(10000, 40000)', '@integer(1000, 10000)', '@integer(3000, 8000)', '@integer(10, 100)'],
      'number|+1': ['@float(1, 10, 2, 2)', '@float(1, 10, 2, 2)', '@float(1, 10, 2, 2)', '@float(1, 10, 2, 2)'],
    },
  ],
  lineData: {
    'Current|7': ['@integer(30, 90)'],
    'Previous|7': ['@integer(30, 90)'],
  },
  CurrentWeek: '@integer(20000, 60000)',
  PreviousWeek: '@integer(30000, 90000)',
  'doughnut|4': ['@integer(50, 30)'],
});

module.exports = function dashboard(req, res) {
  const data = baseData('success', '操作成功');
  data.entity = Dashboard;
  setTimeout(() => {
    res.json(data);
  }, 2000);
};
