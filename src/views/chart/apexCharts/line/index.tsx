import { Component, Vue } from 'vue-property-decorator';
import { Row, Col, Card } from 'ant-design-vue';
import { loadApexCharts } from '@/utils/index';

import { lineChartOptions, lineChartDatalabelOptions } from './params';

import './index.less';

@Component({
  components: {
  'a-row': Row,
  'a-col': Col,
  'a-card': Card,
  }
  })
export default class Line extends Vue {
  itemLayout = {
    span: 12,
    lg: 12,
    md: 12,
    sm: 24,
  }

  lineChart: any = null;
  lineChartDatalabel: any = null;
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
    });
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
        </a-row>
      </div>
    );
  }
}
