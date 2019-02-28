import { Component, Vue } from 'vue-property-decorator';
import { Row, Col, Card } from 'ant-design-vue';
import { loadApexCharts } from '@/utils/index';

import {
  lineColumnMixedOptions,
  multipleYaxisMixedOptions,
  lineAreaMixedOptions,
  allMixedOptions,
} from './params';

import './index.less';

@Component({
  name: 'Mixed',
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-card': Card,
  },
})
export default class Mixed extends Vue {
  itemLayout = {
    xxl: 12,
    xl: 12,
    md: 12,
    sm: 24,
    xs: 24,
  }

  lineColumnMixedChart: any = null;

  multipleYaxisMixedChart: any = null;

  lineAreaMixedChart: any = null;

  allMixedChart: any = null;

  mounted() {
    loadApexCharts().then(() => {
      this.lineColumnMixedChart = new window.ApexCharts(
        document.querySelector('#line-column-mixed'),
        lineColumnMixedOptions,
      );
      this.lineColumnMixedChart.render();
      this.multipleYaxisMixedChart = new window.ApexCharts(
        document.querySelector('#multiple-yaxis-mixed'),
        multipleYaxisMixedOptions,
      );
      this.multipleYaxisMixedChart.render();
      this.lineAreaMixedChart = new window.ApexCharts(
        document.querySelector('#line-area-mixed'),
        lineAreaMixedOptions,
      );
      this.lineAreaMixedChart.render();
      this.allMixedChart = new window.ApexCharts(
        document.querySelector('#all-mixed'),
        allMixedOptions,
      );
      this.allMixedChart.render();
    });
  }

  render() {
    return (
      <div class="mixed-wrap">
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">line-column-mixed</h2>
              <div id="line-column-mixed"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">multiple-yaxis-mixed</h2>
              <div id="multiple-yaxis-mixed"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">line-area-mixed</h2>
              <div id="line-area-mixed"></div>
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">all-mixed</h2>
              <div id="all-mixed"></div>
            </a-card>
          </a-col>
        </a-row>
      </div>
    );
  }
}
