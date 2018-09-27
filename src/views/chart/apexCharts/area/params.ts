import moment from 'moment';

import { dateSeries } from './dateSeries';
import { dataSeries } from './dataSeries';
import { githubdata } from './githubData';


export const basicAreaOptions = {
  chart: {
    height: 380,
    type: 'area',
    zoom: {
      enabled: !1,
    },
  },
  dataLabels: {
    enabled: !1,
  },
  stroke: {
    width: 3,
    curve: 'straight',
  },
  colors: ['#fa5c7c'],
  series: [{
    name: 'STOCK ABC',
    data: [
      8107.85,
      8128.0,
      8122.9,
      8165.5,
      8340.7,
      8423.7,
      8423.5,
      8514.3,
      8481.85,
      8487.7,
      8506.9,
      8626.2,
      8668.95,
      8602.3,
      8607.55,
      8512.9,
      8496.25,
      8600.65,
      8881.1,
      9340.85,
    ],
  }],
  title: {
    text: 'Fundamental Analysis of Stocks',
    align: 'left',
  },
  subtitle: {
    text: 'Price Movements',
    align: 'left',
  },
  labels: [
    '13 Nov 2017',
    '14 Nov 2017',
    '15 Nov 2017',
    '16 Nov 2017',
    '17 Nov 2017',
    '20 Nov 2017',
    '21 Nov 2017',
    '22 Nov 2017',
    '23 Nov 2017',
    '24 Nov 2017',
    '27 Nov 2017',
    '28 Nov 2017',
    '29 Nov 2017',
    '30 Nov 2017',
    '01 Dec 2017',
    '04 Dec 2017',
    '05 Dec 2017',
    '06 Dec 2017',
    '07 Dec 2017',
    '08 Dec 2017',
  ],
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    opposite: !0,
  },
  legend: {
    horizontalAlign: 'left',
  },
  grid: {
    row: {
      colors: ['#f1f3fa', 'transparent'],
    },
    borderColor: '#f1f3fa',
  },
  responsive: [{
    breakpoint: 600,
    options: {
      chart: {
        toolbar: {
          show: !1,
        },
      },
      legend: {
        show: !1,
      },
    },
  }],
};


export const splineAreaOptions = {
  chart: {
    height: 380,
    type: 'area',
  },
  dataLabels: {
    enabled: !1,
  },
  stroke: {
    width: 3,
    curve: 'smooth',
  },
  colors: ['#727cf5', '#6c757d'],
  series: [{
    name: 'Series 1',
    data: [31, 40, 28, 51, 42, 109, 100],
  }, {
    name: 'Series 2',
    data: [11, 32, 45, 32, 34, 52, 41],
  }],
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  },
  tooltip: {
    fixed: {
      enabled: !1,
      position: 'topRight',
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

export const areaChartDatetimeOptions = {
  annotations: {
    yaxis: [{
      value: 30,
      borderColor: '#999',
      yAxisIndex: 0,
      label: {
        show: !0,
        text: 'Support',
        style: {
          color: '#fff',
          background: '#00E396',
        },
      },
    }],
    xaxis: [{
      value: new Date('14 Nov 2012').getTime(),
      borderColor: '#999',
      yAxisIndex: 0,
      label: {
        show: !0,
        text: 'Rally',
        style: {
          color: '#fff',
          background: '#775DD0',
        },
      },
    }],
  },
  chart: {
    type: 'area',
    height: 380,
    scroller: {
      enabled: !0,
    },
  },
  dataLabels: {
    enabled: !1,
  },
  series: [{
    data: dateSeries,
  }],
  markers: {
    size: 0,
    style: 'hollow',
  },
  xaxis: {
    type: 'datetime',
    min: new Date('01 Mar 2012').getTime(),
  },
  yaxis: {},
  tooltip: {
    key: {
      format: 'dd MMM yyyy',
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0,
      stops: [0, 40, 100],
    },
  },
};

export const areaChartNegativeOptions = {
  chart: {
    height: 380,
    type: 'area',
  },
  dataLabels: {
    enabled: !1,
  },
  stroke: {
    width: 2,
    curve: 'straight',
  },
  colors: ['#0acf97', '#ffbc00'],
  series: [{
    name: 'North',
    data: [{
      x: 1996,
      y: 322,
    }, {
      x: 1997,
      y: 324,
    }, {
      x: 1998,
      y: 329,
    }, {
      x: 1999,
      y: 342,
    }, {
      x: 2e3,
      y: 348,
    }, {
      x: 2001,
      y: 334,
    }, {
      x: 2002,
      y: 325,
    }, {
      x: 2003,
      y: 316,
    }, {
      x: 2004,
      y: 318,
    }, {
      x: 2005,
      y: 330,
    }, {
      x: 2006,
      y: 355,
    }, {
      x: 2007,
      y: 366,
    }, {
      x: 2008,
      y: 337,
    }, {
      x: 2009,
      y: 352,
    }, {
      x: 2010,
      y: 377,
    }, {
      x: 2011,
      y: 383,
    }, {
      x: 2012,
      y: 344,
    }, {
      x: 2013,
      y: 366,
    }, {
      x: 2014,
      y: 389,
    }, {
      x: 2015,
      y: 334,
    }],
  }, {
    name: 'South',
    data: [{
      x: 1996,
      y: 162,
    }, {
      x: 1997,
      y: 90,
    }, {
      x: 1998,
      y: 50,
    }, {
      x: 1999,
      y: 77,
    }, {
      x: 2e3,
      y: 35,
    }, {
      x: 2001,
      y: -45,
    }, {
      x: 2002,
      y: -88,
    }, {
      x: 2003,
      y: -120,
    }, {
      x: 2004,
      y: -156,
    }, {
      x: 2005,
      y: -123,
    }, {
      x: 2006,
      y: -88,
    }, {
      x: 2007,
      y: -66,
    }, {
      x: 2008,
      y: -45,
    }, {
      x: 2009,
      y: -29,
    }, {
      x: 2010,
      y: -45,
    }, {
      x: 2011,
      y: -88,
    }, {
      x: 2012,
      y: -132,
    }, {
      x: 2013,
      y: -146,
    }, {
      x: 2014,
      y: -169,
    }, {
      x: 2015,
      y: -184,
    }],
  }],
  xaxis: {
    type: 'datetime',
    axisBorder: {
      show: !1,
    },
    axisTicks: {
      show: !1,
    },
  },
  yaxis: {
    tickAmount: 4,
    floating: !1,
    labels: {
      style: {
        color: '#8e8da4',
      },
      offsetY: -7,
      offsetX: 0,
    },
    axisBorder: {
      show: !1,
    },
    axisTicks: {
      show: !1,
    },
  },
  fill: {
    opacity: 0.5,
    gradient: {
      enabled: !1,
    },
  },
  tooltip: {
    x: {
      format: 'yyyy',
    },
    fixed: {
      enabled: !1,
      position: 'topRight',
    },
  },
  grid: {
    yaxis: {
      lines: {
        offsetX: -30,
      },
    },
    padding: {
      left: 0,
    },
    borderColor: '#f1f3fa',
  },
};

export const areaChartGithubOptions: any = {
  chart: {
    height: 200,
    type: 'area',
    background: '#F6F8FA',
    selection: {
      xaxis: {
        min: new Date('05 Jan 2014').getTime(),
        max: new Date('04 Jan 2015').getTime(),
      },
    },
    // events: {
    //   selection(e, t) {
    //     chartarea2.updateOptions({
    //       xaxis: {
    //         min: t.xaxis.min,
    //         max: t.xaxis.max,
    //       },
    //     }, !1, !1);
    //   },
    //   updated(e, t) {
    //     chartarea2.updateOptions({
    //       xaxis: {
    //         min: t.config.xaxis.min,
    //         max: t.config.xaxis.max,
    //       },
    //     }, !1, !1);
    //   },
    // },
  },
  colors: ['#0acf97'],
  dataLabels: {
    enabled: !1,
  },
  stroke: {
    width: 0,
    curve: 'smooth',
  },
  series: [{
    name: 'commits',
    data: githubdata.series,
  }],
  fill: {
    opacity: 1,
    type: 'solid',
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
  },
  xaxis: {
    type: 'datetime',
  },
  grid: {
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 0.2,
    },
    borderColor: '#f1f3fa',
  },
};

export const areaChartGithub2Options = {
  chart: {
    type: 'area',
    height: 160,
    background: '#F6F8FA',
    toolbar: {
      show: !1,
    },
    events: {
      mounted(e: any) {
        const t = document.querySelector('p span.commits');
        const a = e.getSeriesTotalXRange(e.w.globals.minX, e.w.globals.maxX);
        if (t) t.innerHTML = a;
      },
      updated(e: any) {
        const t = document.querySelector('.cmeta span.commits');
        const a = e.getSeriesTotalXRange(e.w.globals.minX, e.w.globals.maxX);
        if (t) t.innerHTML = a;
      },
    },
  },
  colors: ['#FF7F00'],
  stroke: {
    width: 0,
    curve: 'smooth',
  },
  dataLabels: {
    enabled: !1,
  },
  fill: {
    opacity: 1,
    type: 'solid',
  },
  series: [{
    name: 'commits',
    data: githubdata.series,
  }],
  yaxis: {
    tickAmount: 3,
    labels: {
      show: !1,
    },
  },
  xaxis: {
    type: 'datetime',
  },
  grid: {
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 0.2,
    },
    borderColor: '#f1f3fa',
  },
};

function generateDayWiseTimeSeries(e: any, t: any, a: any) {
  let r = 0;
  let o;
  for (o = []; r < t;) {
    const i = e;
    const n = Math.floor(Math.random() * ((a.max - a.min) + 1)) + a.min;
    o.push([i, n]); e += 864e5; r++;
  }
  return o;
}

export const stackedAreaOptions = {
  chart: {
    height: 422,
    type: 'area',
    stacked: !0,
    scroller: {
      enabled: !0,
    },
    events: {
      selection(e: any, t: any) {
        console.log(new Date(t.xaxis.min));
      },
    },
  },
  colors: ['#727cf5', '#0acf97', '#e3eaef'],
  dataLabels: {
    enabled: !1,
  },
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  series: [{
    name: 'South',
    data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
      min: 10,
      max: 60,
    }),
  }, {
    name: 'North',
    data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
      min: 10,
      max: 20,
    }),
  }, {
    name: 'Central',
    data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
      min: 10,
      max: 15,
    }),
  }],
  fill: {
    gradient: {
      enabled: !0,
      opacityFrom: 0.6,
      opacityTo: 0.8,
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
  },
  xaxis: {
    type: 'datetime',
  },
  grid: {
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 0.2,
    },
    borderColor: '#f1f3fa',
  },
  responsive: [{
    breakpoint: 600,
    options: {
      chart: {
        toolbar: {
          show: !1,
        },
      },
    },
  }],
};

let ts1 = 13885344e5;
let ts2 = 13886208e5;
let ts3 = 13890528e5;
const dataSet: any = [[], [], []];
let innerArr: any;

for (let i = 0; i < 12; i++) {
  innerArr = [ts1 += 864e5, dataSeries[2][i].value];
  dataSet[0].push(innerArr);
}
for (let i = 0; i < 18; i++) {
  innerArr = [ts2 += 864e5, dataSeries[1][i].value];
  dataSet[1].push(innerArr);
}
for (let i = 0; i < 12; i++) {
  innerArr = [ts3 += 864e5, dataSeries[0][i].value];
  dataSet[2].push(innerArr);
}

export const areaTimeSeriesOptions = {
  chart: {
    type: 'area',
    stacked: !1,
    height: 380,
    zoom: {
      enabled: !1,
    },
  },
  plotOptions: {
    line: {
      curve: 'smooth',
    },
  },
  dataLabels: {
    enabled: !1,
  },
  series: [{
    name: 'PRODUCT A',
    data: dataSet[0],
  }, {
    name: 'PRODUCT B',
    data: dataSet[1],
  }, {
    name: 'PRODUCT C',
    data: dataSet[2],
  }],
  colors: ['#39afd1', '#fa5c7c', '#727cf5'],
  markers: {
    size: 0,
    style: 'full',
  },
  stroke: {
    width: 3,
  },
  fill: {
    gradient: {
      enabled: !0,
      shadeIntensity: 1,
      inverseColors: !1,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [20, 100, 100, 100],
    },
  },
  yaxis: {
    labels: {
      style: {
        color: '#8e8da4',
      },
      offsetX: 0,
      formatter(e: any) {
        return (e / 1e6).toFixed(0);
      },
    },
    axisBorder: {
      show: !1,
    },
    axisTicks: {
      show: !1,
    },
  },
  xaxis: {
    type: 'datetime',
    tickAmount: 8,
    labels: {
      formatter(e: any) {
        return moment(new Date(e)).format('DD MMM YYYY');
      },
    },
  },
  title: {
    text: 'Irregular Data in Time Series',
    align: 'left',
    offsetX: 0,
  },
  tooltip: {
    shared: !0,
    y: {
      formatter(e: any) {
        return `${(e / 1e6).toFixed(0)} points`;
      },
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center',
    offsetX: -10,
  },
  grid: {
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 0.2,
    },
    borderColor: '#f1f3fa',
  },
  responsive: [{
    breakpoint: 600,
    options: {
      chart: {
        toolbar: {
          show: !1,
        },
      },
    },
  }],
};

export const areaChartNullvaluesOptions = {
  chart: {
    height: 380,
    type: 'area',
    animations: {
      enabled: !1,
    },
    zoom: {
      enabled: !1,
    },
  },
  dataLabels: {
    enabled: !1,
  },
  stroke: {
    curve: 'straight',
  },
  colors: ['#6c757d'],
  series: [{
    name: 'Network',
    data: [{
      x: 'Dec 23 2017',
      y: null,
    }, {
      x: 'Dec 24 2017',
      y: 44,
    }, {
      x: 'Dec 25 2017',
      y: 31,
    }, {
      x: 'Dec 26 2017',
      y: 38,
    }, {
      x: 'Dec 27 2017',
      y: null,
    }, {
      x: 'Dec 28 2017',
      y: 32,
    }, {
      x: 'Dec 29 2017',
      y: 55,
    }, {
      x: 'Dec 30 2017',
      y: 51,
    }, {
      x: 'Dec 31 2017',
      y: 67,
    }, {
      x: 'Jan 01 2018',
      y: 22,
    }, {
      x: 'Jan 02 2018',
      y: 34,
    }, {
      x: 'Jan 03 2018',
      y: null,
    }, {
      x: 'Jan 04 2018',
      y: null,
    }, {
      x: 'Jan 05 2018',
      y: 11,
    }, {
      x: 'Jan 06 2018',
      y: 4,
    }, {
      x: 'Jan 07 2018',
      y: 15,
    }, {
      x: 'Jan 08 2018',
      y: null,
    }, {
      x: 'Jan 09 2018',
      y: 9,
    }, {
      x: 'Jan 10 2018',
      y: 34,
    }, {
      x: 'Jan 11 2018',
      y: null,
    }, {
      x: 'Jan 12 2018',
      y: null,
    }, {
      x: 'Jan 13 2018',
      y: 13,
    }, {
      x: 'Jan 14 2018',
      y: null,
    }],
  }],
  fill: {
    opacity: 0.8,
    gradient: {
      enabled: !1,
    },
    pattern: {
      enabled: !0,
      style: ['verticalLines', 'horizontalLines'],
      width: 5,
      depth: 6,
    },
  },
  markers: {
    size: 5,
    hover: {
      size: 9,
    },
  },
  title: {
    text: 'Network Monitoring',
  },
  tooltip: {
    intersect: !0,
    shared: !1,
  },
  theme: {
    palette: 'palette1',
  },
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    title: {
      text: 'Bytes Received',
    },
  },
  grid: {
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 0.2,
    },
    borderColor: '#f1f3fa',
  },
  responsive: [{
    breakpoint: 600,
    options: {
      chart: {
        toolbar: {
          show: !1,
        },
      },
    },
  }],
};
