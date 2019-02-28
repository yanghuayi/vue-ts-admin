import { Component, Vue } from 'vue-property-decorator';
import { Row, Col, Card } from 'ant-design-vue';
import { loadApexCharts } from '@/utils/index';

import {
  basicBarOptions,
  groupedBarOptions,
  stackedBarOptions,
  fullStackedBarOptions,
  negativeBarOptions,
  patternBarOptions,
  imageFillBarOptions,
} from './params';

import './index.less';

@Component({
  name: 'Bar',
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-card': Card,
  },
})
export default class Bar extends Vue {
  itemLayout = {
    xxl: 12,
    xl: 12,
    md: 12,
    sm: 24,
    xs: 24,
  }

  basicBarChart: any = null;

  groupedBarChart: any = null;

  stackedBarChart: any = null;

  fullStackedBarChart: any = null;

  negativeBarChart: any = null;

  patternBarChart: any = null;

  imageFillBarChart: any = null;

  mounted() {
    loadApexCharts().then(() => {
      this.basicBarChart = new window.ApexCharts(
        document.querySelector('#basic-bar'),
        basicBarOptions,
      );
      this.basicBarChart.render();
      this.groupedBarChart = new window.ApexCharts(
        document.querySelector('#grouped-bar'),
        groupedBarOptions,
      );
      this.groupedBarChart.render();
      this.stackedBarChart = new window.ApexCharts(
        document.querySelector('#stacked-bar'),
        stackedBarOptions,
      );
      this.stackedBarChart.render();
      this.fullStackedBarChart = new window.ApexCharts(
        document.querySelector('#full-stacked-bar'),
        fullStackedBarOptions,
      );
      this.fullStackedBarChart.render();
      this.negativeBarChart = new window.ApexCharts(
        document.querySelector('#negative-bar'),
        negativeBarOptions,
      );
      this.negativeBarChart.render();
      this.patternBarChart = new window.ApexCharts(
        document.querySelector('#pattern-bar'),
        patternBarOptions,
      );
      this.patternBarChart.render();
      this.imageFillBarChart = new window.ApexCharts(
        document.querySelector('#image-fill-bar'),
        imageFillBarOptions,
      );
      this.imageFillBarChart.render();
    });
  }

  render() {
    return (
      <div class="bar-wrap">
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">basic-bar</h2>
              <div id="basic-bar"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">grouped-bar</h2>
              <div id="grouped-bar"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">stacked-bar</h2>
              <div id="stacked-bar"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">full-stacked-bar</h2>
              <div id="full-stacked-bar"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">negative-bar</h2>
              <div id="negative-bar"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">pattern-bar</h2>
              <div id="pattern-bar"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">image-fill-bar</h2>
              <div id="image-fill-bar"></div>
            </a-card>
          </a-col>
        </a-row>
      </div>
    );
  }
}
