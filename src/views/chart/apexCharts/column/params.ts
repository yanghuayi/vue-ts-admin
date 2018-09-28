export const basicColumnOptions = {
  chart: {
    height: 380,
    type: 'bar',
    toolbar: {
      show: !1,
    },
  },
  plotOptions: {
    bar: {
      horizontal: !1,
      endingShape: 'rounded',
      columnWidth: '55%',
    },
  },
  dataLabels: {
    enabled: !1,
  },
  stroke: {
    show: !0,
    width: 2,
    colors: ['transparent'],
  },
  colors: ['#727cf5', '#0acf97', '#fa5c7c'],
  series: [{
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
  }, {
    name: 'Revenue',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
  }, {
    name: 'Free Cash Flow',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
  }],
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  },
  yaxis: {
    title: {
      text: '$ (thousands)',
    },
  },
  fill: {
    opacity: 1,
  },
  grid: {
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 0.2,
    },
    borderColor: '#f1f3fa',
  },
  tooltip: {
    y: {
      formatter(o: any) {
        return `$ ${o} thousands`;
      },
    },
  },
};

export const datalabelsColumnOptions = {
  chart: {
    height: 380,
    type: 'bar',
    toolbar: {
      show: !1,
    },
  },
  plotOptions: {
    bar: {
      dataLabels: {
        position: 'top',
      },
    },
  },
  dataLabels: {
    enabled: !0,
    formatter(o: any) {
      return `${o}%`;
    },
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ['#304758'],
    },
  },
  colors: ['#727cf5'],
  series: [{
    name: 'Inflation',
    data: [2.3, 3.1, 4, 10.1, 4, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
  }],
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    position: 'top',
    labels: {
      offsetY: -18,
    },
    axisBorder: {
      show: !1,
    },
    axisTicks: {
      show: !1,
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
    tooltip: {
      enabled: !0,
      offsetY: -35,
    },
  },
  fill: {
    gradient: {
      enabled: !1,
      shade: 'light',
      type: 'horizontal',
      shadeIntensity: 0.25,
      gradientToColors: 0,
      inverseColors: !0,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [50, 0, 100, 100],
    },
  },
  yaxis: {
    axisBorder: {
      show: !1,
    },
    axisTicks: {
      show: !1,
    },
    labels: {
      show: !1,
      formatter(o: any) {
        return `${o}%`;
      },
    },
  },
  title: {
    text: 'Monthly Inflation in Argentina, 2002',
    floating: !0,
    offsetY: 350,
    align: 'center',
    style: {
      color: '#444',
    },
  },
  grid: {
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 0.2,
    },
    borderColor: '#f1f3fa',
  },
};

export const stackedColumnOptions = {
  chart: {
    height: 380,
    type: 'bar',
    stacked: !0,
    toolbar: {
      show: !1,
    },
  },
  plotOptions: {
    bar: {
      horizontal: !1,
      columnWidth: '50%',
    },
  },
  series: [{
    name: 'Product A',
    data: [44, 55, 41, 67, 22, 43, 21, 49],
  }, {
    name: 'Product B',
    data: [13, 23, 20, 8, 13, 27, 33, 12],
  }, {
    name: 'Product C',
    data: [11, 17, 15, 15, 21, 14, 15, 13],
  }],
  xaxis: {
    categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4'],
  },
  colors: ['#39afd1', '#ffbc00', '#e3eaef'],
  fill: {
    opacity: 1,
  },
  grid: {
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 0.2,
    },
    borderColor: '#f1f3fa',
  },
};

export const fullStackedColumnOptions = {
  chart: {
    height: 380,
    type: 'bar',
    stacked: !0,
    stackType: '100%',
    toolbar: {
      show: !1,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
    },
  },
  series: [{
    name: 'Product A',
    data: [44, 55, 41, 67, 22, 43, 21, 49],
  }, {
    name: 'Product B',
    data: [13, 23, 20, 8, 13, 27, 33, 12],
  }, {
    name: 'Product C',
    data: [11, 17, 15, 15, 21, 14, 15, 13],
  }],
  xaxis: {
    categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4'],
  },
  fill: {
    opacity: 1,
  },
  colors: ['#39afd1', '#0acf97', '#e3eaef'],
  grid: {
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 0.2,
    },
    borderColor: '#f1f3fa',
  },
};

export const rotateLabelsColumnOptions = {
  annotations: {
    points: [{
      x: 'Bananas',
      seriesIndex: 0,
      label: {
        borderColor: '#727cf5',
        offsetY: 0,
        style: {
          color: '#fff',
          background: '#727cf5',
        },
        text: 'Bananas are good',
      },
    }],
  },
  chart: {
    height: 380,
    type: 'bar',
    toolbar: {
      show: !1,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: !1,
  },
  stroke: {
    width: 2,
  },
  colors: ['#fa5c7c'],
  series: [{
    name: 'Servings',
    data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65, 35],
  }],
  grid: {
    row: {
      colors: ['#f1f3fa', 'transparent'],
    },
    borderColor: '#f1f3fa',
  },
  xaxis: {
    labels: {
      rotate: -45,
    },
    categories: ['Apples', 'Oranges', 'Strawberries', 'Pineapples', 'Mangoes', 'Bananas', 'Blackberries', 'Pears',
      'Watermelons', 'Cherries', 'Pomegranates', 'Tangerines', 'Papayas'],
  },
  yaxis: {
    title: {
      text: 'Servings',
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'horizontal',
      shadeIntensity: 0.25,
      gradientToColors: 0,
      inverseColors: !0,
      opacityFrom: 0.85,
      opacityTo: 0.85,
      stops: [50, 0, 100],
    },
  },
};

export const negativeValueColumnOptions = {
  chart: {
    height: 380,
    type: 'bar',
    toolbar: {
      show: !1,
    },
  },
  plotOptions: {
    bar: {
      colors: {
        ranges: [{
          from: -100,
          to: -46,
          color: '#fa5c7c',
        }, {
          from: -45,
          to: 0,
          color: '#ffbc00',
        }],
      },
      columnWidth: '80%',
    },
  },
  dataLabels: {
    enabled: !1,
  },
  colors: ['#727cf5'],
  series: [{
    name: 'Cash Flow',
    data: [
      1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16,
      -11.1, -6.09, 0.34, 3.88, 13.07, 5.8, 2, 7.37, 8.1,
      13.57, 15.75, 17.1, 19.8, -27.03, -54.4, -47.2, -43.3,
      -18.6, -48.6, -41.1, -39.6, -37.6, -29.4, -21.4, -2.4,
    ],
  }],
  yaxis: {
    title: {
      text: 'Growth',
    },
    labels: {
      formatter(o: any) {
        return `${o.toFixed(0)}%`;
      },
    },
  },
  xaxis: {
    categories: [
      '2011-01-01', '2011-02-01', '2011-03-01', '2011-04-01', '2011-05-01', '2011-06-01', '2011-07-01',
      '2011-08-01', '2011-09-01', '2011-10-01', '2011-11-01', '2011-12-01', '2012-01-01', '2012-02-01',
      '2012-03-01', '2012-04-01', '2012-05-01', '2012-06-01', '2012-07-01', '2012-08-01', '2012-09-01',
      '2012-10-01', '2012-11-01', '2012-12-01', '2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01',
      '2013-05-01', '2013-06-01', '2013-07-01', '2013-08-01', '2013-09-01',
    ],
    labels: {
      rotate: -90,
    },
  },
  grid: {
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 0.2,
    },
    borderColor: '#f1f3fa',
  },
};

const colors = ['#727cf5', '#6c757d', '#0acf97', '#fa5c7c', '#ffbc00', '#39afd1', '#e3eaef', '#313a46'];
export const distributedColumnOptions = {
  chart: {
    height: 380,
    type: 'bar',
    toolbar: {
      show: !1,
    },
    events: {
      click(o: any, e: any, t: any) {
        console.log(o, e, t);
      },
    },
  },
  colors,
  plotOptions: {
    bar: {
      columnWidth: '45%',
      distributed: !0,
    },
  },
  dataLabels: {
    enabled: !1,
  },
  series: [{
    data: [21, 22, 10, 28, 16, 21, 13, 30],
  }],
  xaxis: {
    categories: ['John', 'Joe', 'Jake', 'Amber', 'Peter', 'Mary', 'David', 'Lily'],
    labels: {
      style: {
        colors,
        fontSize: '14px',
      },
    },
  },
  grid: {
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 0.2,
    },
    borderColor: '#f1f3fa',
  },
};
