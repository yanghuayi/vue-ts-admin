import { dataSeries } from './dataSeries';

export const lineChartOptions = {
  chart: {
    height: 380,
    type: 'line',
    zoom: {
      enabled: !1,
    },
  },
  dataLabels: {
    enabled: !1,
  },
  colors: ['#ffbc00'],
  stroke: {
    width: [4],
    curve: 'straight',
  },
  series: [{
    name: 'Desktops',
    data: [30, 41, 35, 51, 49, 62, 69, 91, 126],
  }],
  title: {
    text: 'Product Trends by Month',
    align: 'center',
  },
  grid: {
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 0.2,
    },
    borderColor: '#f1f3fa',
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
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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

export const lineChartDatalabelOptions = {
  chart: {
    height: 380,
    type: 'line',
    zoom: {
      enabled: !1,
    },
    toolbar: {
      show: !1,
    },
  },
  colors: ['#727cf5', '#0acf97'],
  dataLabels: {
    enabled: !0,
  },
  stroke: {
    width: [3, 3],
    curve: 'smooth',
  },
  series: [{
    name: 'High - 2018',
    data: [28, 29, 33, 36, 32, 32, 33],
  }, {
    name: 'Low - 2018',
    data: [12, 11, 14, 18, 17, 13, 13],
  }],
  title: {
    text: 'Average High & Low Temperature',
    align: 'left',
  },
  grid: {
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 0.2,
    },
    borderColor: '#f1f3fa',
  },
  markers: {
    style: 'inverted',
    size: 6,
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    title: {
      text: 'Month',
    },
  },
  yaxis: {
    title: {
      text: 'Temperature',
    },
    min: 5,
    max: 40,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: !0,
    offsetY: -25,
    offsetX: -5,
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
let ts2 = 14844186e5;
const dates: any = [];
const spikes = [5, -5, 3, -3, 8, -8];

for (let i = 0; i < 120; i++) {
  const innerArr = [ts2 += 864e5, dataSeries[1][i].value];
  dates.push(innerArr);
}
export const lineChartZoomableOptions = {
  chart: {
    type: 'area',
    stacked: !1,
    height: 380,
    zoom: {
      enabled: !0,
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
  stroke: {
    width: [3],
  },
  series: [{
    name: 'XYZ MOTORS',
    data: dates,
  }],
  markers: {
    size: 0,
    style: 'full',
  },
  colors: ['#fa5c7c'],
  title: {
    text: 'Stock Price Movement',
    align: 'left',
  },
  grid: {
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 0.2,
    },
    borderColor: '#f1f3fa',
  },
  fill: {
    gradient: {
      enabled: !0,
      shadeIntensity: 1,
      inverseColors: !1,
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [0, 70, 80, 100],
    },
  },
  yaxis: {
    min: 2e7,
    max: 25e7,
    labels: {
      formatter(e: any) {
        return (e / 1e6).toFixed(0);
      },
    },
    title: {
      text: 'Price',
    },
  },
  xaxis: {
    type: 'datetime',
  },
  tooltip: {
    shared: !1,
    y: {
      formatter(e: any) {
        return (e / 1e6).toFixed(0);
      },
    },
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

export const lineChartAnnotationsOptions = {
  annotations: {
    yaxis: [{
      y: 8200,
      borderColor: '#0acf97',
      label: {
        borderColor: '#0acf97',
        style: {
          color: '#fff',
          background: '#0acf97',
        },
        text: 'Support',
      },
    }],
    xaxis: [{
      x: new Date('23 Nov 2017').getTime(),
      borderColor: '#775DD0',
      label: {
        borderColor: '#775DD0',
        style: {
          color: '#fff',
          background: '#775DD0',
        },
        text: 'Anno Test',
      },
    }, {
      x: new Date('03 Dec 2017').getTime(),
      borderColor: '#ffbc00',
      label: {
        borderColor: '#ffbc00',
        style: {
          color: '#fff',
          background: '#ffbc00',
        },
        orientation: 'horizontal',
        text: 'New Beginning',
      },
    }],
    points: [{
      x: new Date('27 Nov 2017').getTime(),
      y: 8506.9,
      marker: {
        size: 8,
        fillColor: '#fff',
        strokeColor: '#fa5c7c',
        radius: 2,
      },
      label: {
        borderColor: '#fa5c7c',
        offsetY: 0,
        style: {
          color: '#fff',
          background: '#fa5c7c',
        },
        text: 'Point Annotation',
      },
    }],
  },
  chart: {
    height: 380,
    type: 'line',
    id: 'areachart-2',
  },
  colors: ['#39afd1'],
  dataLabels: {
    enabled: !1,
  },
  stroke: {
    width: [3],
    curve: 'straight',
  },
  series: [{
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
    text: 'Line with Annotations',
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
      legend: {
        show: !1,
      },
    },
  }],
};

function generateDayWiseTimeSeries(e: any, t: any, a: any) {
  const r = [];
  for (let o = 0; o < t;) {
    const n = e;
    const i = Math.floor(Math.random() * ((a.max - a.min) + 1)) + a.min;
    r.push([n, i]);
    e += 864e5;
    o++;
  }
  return r;
}

export const lineChartSyncingOptions = {
  chart: {
    type: 'line',
    height: 160,
    toolbar: {
      tools: {
        zoom: !1,
        pan: !1,
        selection: !1,
        download: !1,
        reset: !0,
      },
    },
  },
  colors: ['#727cf5'],
  stroke: {
    width: [3],
    curve: 'straight',
  },
  dataLabels: {
    enabled: !1,
  },
  fill: {
    opacity: 1,
  },
  series: [{
    data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
      min: 10,
      max: 30,
    }),
  }],
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

export const lineChartSyncing2Options = {
  chart: {
    height: 200,
    type: 'line',
    stacked: !0,
    scroller: {
      enabled: !0,
      thumb: {
        height: 4,
        background: '#0acf97',
      },
      scrollButtons: {
        enabled: !0,
        size: 6,
        borderWidth: 2,
        borderColor: '#0acf97',
        fillColor: '#0acf97',
      },
    },
    selection: {
      xaxis: {
        min: new Date('19 Feb 2017').getTime(),
        max: new Date('26 Feb 2017').getTime(),
      },
    },
    // events: {
    //   selection(e, t) {
    //     chartline2.updateOptions({
    //       xaxis: {
    //         min: t.xaxis.min,
    //         max: t.xaxis.max,
    //       },
    //     }, !1, !1);
    //   },
    //   updated(e, t) {
    //     chartline2.updateOptions({
    //       xaxis: {
    //         min: t.config.xaxis.min,
    //         max: t.config.xaxis.max,
    //       },
    //     }, !1, !1);
    //   },
    // },
  },
  colors: ['#6c757d'],
  dataLabels: {
    enabled: !1,
  },
  stroke: {
    width: [3],
    curve: 'smooth',
  },
  series: [{
    data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
      min: 10,
      max: 60,
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
};

export const lineChartGradientOptions = {
  chart: {
    height: 374,
    type: 'line',
    shadow: {
      enabled: !1,
      color: '#bbb',
      top: 3,
      left: 2,
      blur: 3,
      opacity: 1,
    },
  },
  stroke: {
    width: 5,
    curve: 'smooth',
  },
  series: [{
    name: 'Likes',
    data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
  }],
  xaxis: {
    type: 'datetime',
    categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000',
      '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001',
      '3/11/2001', '4/11/2001', '5/11/2001', '6/11/2001'],
  },
  title: {
    text: 'Social Media',
    align: 'left',
    style: {
      fontSize: '16px',
      color: '#666',
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientToColors: ['#fa5c7c'],
      shadeIntensity: 1,
      type: 'horizontal',
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100],
    },
  },
  markers: {
    size: 4,
    opacity: 0.9,
    colors: ['#ffbc00'],
    strokeColor: '#fff',
    strokeWidth: 2,
    style: 'inverted',
    hover: {
      size: 7,
    },
  },
  yaxis: {
    min: -10,
    max: 40,
    title: {
      text: 'Engagement',
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
      legend: {
        show: !1,
      },
    },
  }],
};


export const lineChartMissingOptions = {
  chart: {
    height: 380,
    type: 'line',
    zoom: {
      enabled: !1,
    },
    animations: {
      enabled: !1,
    },
  },
  stroke: {
    width: [5, 5, 4],
    curve: 'straight',
  },
  series: [{
    name: 'Peter',
    data: [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9],
  }, {
    name: 'Johnny',
    data: [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null],
  }, {
    name: 'David',
    data: [null, null, null, null, 3, 4, 1, 3, 4, 6, 7, 9, 5, null, null, null],
  }],
  colors: ['#ffbc00', '#0acf97', '#39afd1'],
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  grid: {
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 0.2,
    },
    borderColor: '#f1f3fa',
  },
};

export const lineChartDashedOptions = {
  chart: {
    height: 380,
    type: 'line',
    zoom: {
      enabled: !1,
    },
  },
  dataLabels: {
    enabled: !1,
  },
  stroke: {
    width: [3, 5, 3],
    curve: 'straight',
    dashArray: [0, 8, 5],
  },
  series: [{
    name: 'Session Duration',
    data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
  }, {
    name: 'Page Views',
    data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
  }, {
    name: 'Total Visits',
    data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
  }],
  markers: {
    size: 0,
    style: 'hollow',
  },
  xaxis: {
    categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan', '10 Jan',
      '11 Jan', '12 Jan'],
  },
  colors: ['#6c757d', '#0acf97', '#39afd1'],
  tooltip: {
    y: {
      title: {
        formatter(e: any) {
          if (e === 'Session Duration') {
            return `${e} (mins)`;
          }
          if (e === 'Page Views') {
            return `${e} per session`;
          }
          return e;
        },
      },
    },
  },
  grid: {
    borderColor: '#f1f3fa',
  },
};

export const lineChartRealtimedOptions = {
  chart: {
    height: 380,
    type: 'line',
    animations: {
      dynamicAnimation: {
        enabled: !1,
      },
    },
    toolbar: {
      show: !1,
    },
  },
  dataLabels: {
    enabled: !1,
  },
  stroke: {
    width: [3, 3],
    curve: 'smooth',
  },
  series: [{
    name: 'Laptops',
    data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10, 51, 32, 12],
  }, {
    name: 'Desktops',
    data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35, 20, 51, 36],
  }],
  markers: {
    size: 0,
  },
  colors: ['#fa5c7c', '#727cf5'],
  xaxis: {
    range: 14,
    tickAmount: 14,
  },
  legend: {
    show: !1,
  },
  grid: {
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 0.2,
    },
    borderColor: '#f1f3fa',
  },
};
