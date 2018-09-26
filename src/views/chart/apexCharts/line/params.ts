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
