import { Component, Vue } from 'vue-property-decorator';
import { Row, Col, Card } from 'ant-design-vue';
import { loadApexCharts } from '@/utils/index';

import {
  basicAreaOptions,
  splineAreaOptions,
  areaChartDatetimeOptions,
  areaChartNegativeOptions,
  areaChartGithubOptions,
  areaChartGithub2Options,
  stackedAreaOptions,
  areaTimeSeriesOptions,
  areaChartNullvaluesOptions,
} from './params';

import './index.less';

@Component({
  name: 'Area',
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-card': Card,
  },
})
export default class Area extends Vue {
  itemLayout = {
    xxl: 12,
    xl: 12,
    md: 12,
    sm: 24,
    xs: 24,
  }

  basicAreaChart: any = null;

  splineAreaChart: any = null;

  areaChartDatetimeChart: any = null;

  areaChartNegativeChart: any = null;

  areaChartGithubChart: any = null;

  areaChartGithub2Chart: any = null;

  stackedAreaChart: any = null;

  areaTimeSeriesChart: any = null;

  areaChartNullvaluesChart: any = null;

  mounted() {
    loadApexCharts().then(() => {
      this.basicAreaChart = new window.ApexCharts(
        document.querySelector('#basic-area'),
        basicAreaOptions,
      );
      this.basicAreaChart.render();
      this.splineAreaChart = new window.ApexCharts(
        document.querySelector('#spline-area'),
        splineAreaOptions,
      );
      this.splineAreaChart.render();
      this.areaChartDatetimeChart = new window.ApexCharts(
        document.querySelector('#area-chart-datetime'),
        areaChartDatetimeOptions,
      );
      this.areaChartDatetimeChart.render();
      this.areaChartNegativeChart = new window.ApexCharts(
        document.querySelector('#area-chart-negative'),
        areaChartNegativeOptions,
      );
      this.areaChartNegativeChart.render();
      this.areaChartGithub2Chart = new window.ApexCharts(
        document.querySelector('#area-chart-github2'),
        areaChartGithub2Options,
      );
      this.areaChartGithub2Chart.render();
      areaChartGithubOptions.events = {
        selection(e: any, t: any) {
          this.areaChartGithub2Chart.updateOptions({
            xaxis: {
              min: t.xaxis.min,
              max: t.xaxis.max,
            },
          }, !1, !1);
        },
        updated(e: any, t: any) {
          this.areaChartGithub2Chart.updateOptions({
            xaxis: {
              min: t.config.xaxis.min,
              max: t.config.xaxis.max,
            },
          }, !1, !1);
        },
      };
      this.areaChartGithubChart = new window.ApexCharts(
        document.querySelector('#area-chart-github'),
        areaChartGithubOptions,
      );
      this.areaChartGithubChart.render();
      this.stackedAreaChart = new window.ApexCharts(
        document.querySelector('#stacked-area'),
        stackedAreaOptions,
      );
      this.stackedAreaChart.render();
      this.areaTimeSeriesChart = new window.ApexCharts(
        document.querySelector('#area-timeSeries'),
        areaTimeSeriesOptions,
      );
      this.areaTimeSeriesChart.render();
      this.areaChartNullvaluesChart = new window.ApexCharts(
        document.querySelector('#area-chart-nullvalues'),
        areaChartNullvaluesOptions,
      );
      this.areaChartNullvaluesChart.render();
    });
  }

  render() {
    return (
      <div class="area-wrap">
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">basic-area</h2>
              <div id="basic-area"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">spline-area</h2>
              <div id="spline-area"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">area-chart-datetime</h2>
              <div id="area-chart-datetime"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">area-chart-negative</h2>
              <div id="area-chart-negative"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">area-chart-github</h2>
              <div id="area-chart-github" style="margin-bottom: 48px"></div>
              <div id="area-chart-github2"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">stacked-area</h2>
              <div id="stacked-area"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">area-timeSeries</h2>
              <div id="area-timeSeries"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">area-chart-nullvalues</h2>
              <div id="area-chart-nullvalues"></div>
            </a-card>
          </a-col>
        </a-row>
      </div>
    );
  }
}
