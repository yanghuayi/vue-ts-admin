import { Component, Vue } from 'vue-property-decorator';
import { Row, Col, Card } from 'ant-design-vue';
import { loadApexCharts } from '@/utils/index';

import {
  lineChartOptions,
  lineChartDatalabelOptions,
  lineChartZoomableOptions,
  lineChartAnnotationsOptions,
  lineChartSyncingOptions,
  lineChartSyncing2Options,
  lineChartGradientOptions,
  lineChartMissingOptions,
  lineChartDashedOptions,
  lineChartRealtimedOptions,
} from './params';

import './index.less';

@Component({
  name: 'Line',
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-card': Card,
  },
})
export default class Line extends Vue {
  itemLayout = {
    xxl: 12,
    xl: 12,
    md: 12,
    sm: 24,
    xs: 24,
  }

  lineChart: any = null;

  lineChartDatalabel: any = null;

  lineChartZoomable: any = null;

  lineChartAnnotationsChart: any = null;

  lineChartSyncingChart: any = null;

  lineChartSyncing2Chart: any = null;

  lineChartGradientChart: any = null;

  lineChartMissingChart: any = null;

  lineChartDashedChart: any = null;

  lineChartRealtimedChart: any = null;

  timer: any = null;

  mounted() {
    loadApexCharts().then(() => {
      this.lineChart = new window.ApexCharts(
        document.querySelector('#line-chart'),
        lineChartOptions,
      );
      this.lineChart.render();
      this.lineChartDatalabel = new window.ApexCharts(
        document.querySelector('#line-chart-datalabel'),
        lineChartDatalabelOptions,
      );
      this.lineChartDatalabel.render();
      this.lineChartZoomable = new window.ApexCharts(
        document.querySelector('#line-chart-zoomable'),
        lineChartZoomableOptions,
      );
      this.lineChartZoomable.render();
      this.lineChartAnnotationsChart = new window.ApexCharts(
        document.querySelector('#line-chart-annotations'),
        lineChartAnnotationsOptions,
      );
      this.lineChartAnnotationsChart.render();
      this.lineChartSyncingChart = new window.ApexCharts(
        document.querySelector('#line-chart-syncing'),
        lineChartSyncingOptions,
      );
      this.lineChartSyncingChart.render();
      this.lineChartSyncing2Chart = new window.ApexCharts(
        document.querySelector('#line-chart-syncing2'),
        lineChartSyncing2Options,
      );
      this.lineChartSyncing2Chart.render();
      this.lineChartGradientChart = new window.ApexCharts(
        document.querySelector('#line-chart-gradient'),
        lineChartGradientOptions,
      );
      this.lineChartGradientChart.render();
      this.lineChartMissingChart = new window.ApexCharts(
        document.querySelector('#line-chart-missing'),
        lineChartMissingOptions,
      );
      this.lineChartMissingChart.render();
      this.lineChartDashedChart = new window.ApexCharts(
        document.querySelector('#line-chart-dashed'),
        lineChartDashedOptions,
      );
      this.lineChartDashedChart.render();

      this.lineChartRealtimedChart = new window.ApexCharts(
        document.querySelector('#line-chart-realtimed'),
        lineChartRealtimedOptions,
      );
      this.lineChartRealtimedChart.render();
      this.timer = window.setInterval(() => {
        this.lineChartRealtimedChart.appendData([{
          data: [Math.floor((20 * Math.random()) + 20)],
        }, {
          data: [Math.floor((20 * Math.random()) + 20)],
        }]);
      }, 1e3);
    });
  }

  beforeDestroy() {
    window.clearInterval(this.timer);
  }

  render() {
    return (
      <div class="line-wrap">
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">line-chart</h2>
              <div id="line-chart"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">line-chart-datalabel</h2>
              <div id="line-chart-datalabel"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">line-chart-zoomable</h2>
              <div id="line-chart-zoomable"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">line-chart-annotations</h2>
              <div id="line-chart-annotations"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">SYNCING CHARTS</h2>
              <div id="line-chart-syncing2"></div>
              <div id="line-chart-syncing"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">line-chart-gradient</h2>
              <div id="line-chart-gradient"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">line-chart-missing</h2>
              <div id="line-chart-missing"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">line-chart-dashed</h2>
              <div id="line-chart-dashed"></div>
            </a-card>
          </a-col>
          <a-col span={24}>
            <a-card>
              <h2 class="item-title">line-chart-realtime</h2>
              <div id="line-chart-realtimed"></div>
            </a-card>
          </a-col>
        </a-row>
      </div>
    );
  }
}
