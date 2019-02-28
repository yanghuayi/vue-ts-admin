import { Component, Vue } from 'vue-property-decorator';
import { Row, Col, Card } from 'ant-design-vue';
import { loadApexCharts } from '@/utils/index';

import {
  basicColumnOptions,
  datalabelsColumnOptions,
  stackedColumnOptions,
  fullStackedColumnOptions,
  rotateLabelsColumnOptions,
  negativeValueColumnOptions,
  distributedColumnOptions,
} from './params';

import './index.less';

@Component({
  name: 'Column',
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-card': Card,
  },
})
export default class Column extends Vue {
  itemLayout = {
    xxl: 12,
    xl: 12,
    md: 12,
    sm: 24,
    xs: 24,
  }

  basicColumnChart: any = null;

  datalabelsColumnChart: any = null;

  stackedColumnChart: any = null;

  fullStackedColumnChart: any = null;

  rotateLabelsColumnChart: any = null;

  negativeValueColumnChart: any = null;

  distributedColumnChart: any = null;

  mounted() {
    loadApexCharts().then(() => {
      this.basicColumnChart = new window.ApexCharts(
        document.querySelector('#basic-column'),
        basicColumnOptions,
      );
      this.basicColumnChart.render();
      this.datalabelsColumnChart = new window.ApexCharts(
        document.querySelector('#datalabels-column'),
        datalabelsColumnOptions,
      );
      this.datalabelsColumnChart.render();
      this.stackedColumnChart = new window.ApexCharts(
        document.querySelector('#stacked-column'),
        stackedColumnOptions,
      );
      this.stackedColumnChart.render();
      this.fullStackedColumnChart = new window.ApexCharts(
        document.querySelector('#full-stacked-column'),
        fullStackedColumnOptions,
      );
      this.fullStackedColumnChart.render();
      this.rotateLabelsColumnChart = new window.ApexCharts(
        document.querySelector('#rotate-labels-column'),
        rotateLabelsColumnOptions,
      );
      this.rotateLabelsColumnChart.render();
      this.negativeValueColumnChart = new window.ApexCharts(
        document.querySelector('#negative-value-column'),
        negativeValueColumnOptions,
      );
      this.negativeValueColumnChart.render();
      this.distributedColumnChart = new window.ApexCharts(
        document.querySelector('#distributed-column'),
        distributedColumnOptions,
      );
      this.distributedColumnChart.render();
    });
  }

  render() {
    return (
      <div class="column-wrap">
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">basic-column</h2>
              <div id="basic-column"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">datalabels-column</h2>
              <div id="datalabels-column"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">stacked-column</h2>
              <div id="stacked-column"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">full-stacked-column</h2>
              <div id="full-stacked-column"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">rotate-labels-column</h2>
              <div id="rotate-labels-column"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">negative-value-column</h2>
              <div id="negative-value-column"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">distributed-column</h2>
              <div id="distributed-column"></div>
            </a-card>
          </a-col>
        </a-row>
      </div>
    );
  }
}
