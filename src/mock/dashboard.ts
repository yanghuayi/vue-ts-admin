import Mock from 'mockjs';
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DashBoard = Mock.mock({
  'projections|12': [{
    name: 'projections',
    'time|+1': month,
    value: '@integer(30, 90)',
  }],
  'actuals|12': [{
    name: 'actuals',
    'time|+1': month,
    value: '@integer(30, 90)',
  }],
});

console.log(DashBoard);
export default function dashboard() {
  return DashBoard;
}
