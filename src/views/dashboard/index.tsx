import { Component, Vue, Emit } from 'vue-property-decorator';
import {
  Button, DatePicker, Modal, Row, Col, Card, Icon, Radio,
} from 'ant-design-vue';
import Chart from 'chart.js';
import { numFormat } from '@/utils/index';

import './index.less';

@Component({
  name: 'Dashboard',
  components: {
    'a-button': Button,
    'a-date-picker': DatePicker,
    'a-radio-group': Radio.Group,
    'a-radio-button': Radio.Button,
    'a-modal': Modal,
    'a-row': Row,
    'a-col': Col,
    'a-card': Card,
    'a-icon': Icon,
  },
})
export default class Dashboard extends Vue {
  pageData: any = null;

  created() {
    window.api.dashboard(null).then((res: returnData) => {
      this.pageData = res.data.entity;
      this.loading = false;
      setTimeout(() => {
        this.init();
      }, 200);
    });
  }

  init() {
    this.BarChart();
    this.LineChart();
    this.Doughnut();
  }

  BarChartDom: any = null

  BarChart() {
    const BarChart: any = document.getElementById('BarChart');
    if (!BarChart) {
      return false;
    }
    const a: any = BarChart.getContext('2d').createLinearGradient(
      0, 500, 0,
      150,
    );
    a.addColorStop(0, '#fa5c7c');
    a.addColorStop(1, '#727cf5');
    const config: any = {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'projections',
          backgroundColor: a,
          borderColor: a,
          hoverBackgroundColor: a,
          hoverBorderColor: a,
          data: this.pageData.projections,
        }, {
          label: 'actuals',
          backgroundColor: '#e3eaef',
          borderColor: '#e3eaef',
          hoverBackgroundColor: '#e3eaef',
          hoverBorderColor: '#e3eaef',
          data: this.pageData.actuals,
        }],
      },
      options: {
        maintainAspectRatio: !1,
        legend: {
          display: !1,
        },
        scales: {
          yAxes: [{
            gridLines: {
              display: !1,
            },
            stacked: !1,
            ticks: {
              stepSize: 20,
            },
          }],
          xAxes: [{
            barPercentage: 0.7,
            categoryPercentage: 0.5,
            stacked: !1,
            gridLines: {
              color: 'rgba(0,0,0,0.01)',
            },
          }],
        },
      },
    };
    this.BarChartDom = new Chart(BarChart.getContext('2d'), config);
  }

  LineChart() {
    const LineChart: any = document.getElementById('LineChart');
    const config: any = {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Current Week',
          backgroundColor: 'transparent',
          borderColor: '#727cf5',
          data: this.pageData.lineData.Current,
        }, {
          label: 'Previous Week',
          fill: !0,
          backgroundColor: 'transparent',
          borderColor: '#0acf97',
          data: this.pageData.lineData.Previous,
        }],
      },
      options: {
        maintainAspectRatio: !1,
        legend: {
          display: !1,
        },
        tooltips: {
          intersect: !1,
        },
        hover: {
          intersect: !0,
        },
        plugins: {
          filler: {
            propagate: !1,
          },
        },
        scales: {
          xAxes: [{
            reverse: !0,
            gridLines: {
              color: 'rgba(0,0,0,0.05)',
            },
          }],
          yAxes: [{
            ticks: {
              stepSize: 20,
            },
            display: !0,
            borderDash: [5, 5],
            gridLines: {
              color: 'rgba(0,0,0,0)',
              fontColor: '#fff',
            },
          }],
        },
      },
    };
    this.BarChartDom = new Chart(LineChart.getContext('2d'), config);
  }

  DoughnutDom: any = null

  Doughnut() {
    const config: any = {
      type: 'doughnut',
      data: {
        labels: ['Direct', 'Affilliate', 'Sponsored', 'E-mail'],
        datasets: [{
          data: this.pageData.doughnut,
          backgroundColor: ['#727cf5', '#fa5c7c', '#0acf97', '#ebeff2'],
          borderColor: 'transparent',
          borderWidth: '3',
        }],
      },
      options: {
        maintainAspectRatio: !1,
        cutoutPercentage: 60,
        legend: {
          display: !1,
        },
      },
    };
    const Doughnut: any = document.getElementById('Doughnut');
    this.DoughnutDom = new Chart(Doughnut.getContext('2d'), config);
  }


  ColLayout: any = {
    span: 12,
    lg: 12,
    md: 12,
    sm: 24,
    xs: 24,
  }

  tabChange() {

  }

  iconList = ['team', 'shopping-cart', 'pay-circle', 'line-chart']

  loading: boolean = true;

  render() {
    return (
      <div class="container">
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }} class="dash-col">
          <a-col span={10} xxl={10} xl={10} lg={12} md={24} sm={24} xs={24}>
            <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
              {
                this.pageData && this.pageData.dataList.map((item: any, index: number) => <a-col {...{ props: this.ColLayout }} class="sub-item">
                  <a-card loading={this.loading} class="dash-card">
                    <h3>{item.name}</h3>
                    <a-icon class="icon" type={this.iconList[index]}></a-icon>
                    <p class="number">{numFormat(item.value)}</p>
                    <div class="footer">
                      <span class={`s-number ${index % 2 ? 'green' : 'red'}`}>
                        <a-icon type={index % 2 ? 'arrow-up' : 'arrow-down'}></a-icon>
                        {item.number}%
                      </span>
                      <span class="txt">Since last month</span>
                    </div>
                  </a-card>
                </a-col>)
              }
              {
                !this.pageData && this.iconList.map((item: any) => <a-col {...{ props: this.ColLayout }} class="sub-item">
                  <a-card loading={this.loading} class="dash-card" style="height: 160px">
                    ............
                  </a-card>
                </a-col>)
              }
            </a-row>
          </a-col>
          <a-col span={14} xxl={14} xl={14} lg={12} md={24} sm={24} xs={24}>
            <a-card loading={this.loading} class="dash-box dash-bar-chart">
              <a-icon class="opreat" type="ellipsis"></a-icon>
              <h2 class="title">PROJECTIONS VS ACTUALS</h2>
              <div style="height: 263px;" class="chartjs-chart">
                <canvas height="86px" id="BarChart"></canvas>
              </div>
            </a-card>
          </a-col>
        </a-row>
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
          <a-col span={16} xxl={16} xl={16} lg={24} md={24} sm={24} xs={24}>
            <a-card loading={this.loading} class="dash-box revenue-chart">
              <h2 class="title">REVENUE</h2>
              <a-icon class="opreat" type="ellipsis"></a-icon>
              <div class="week-data">
                <div class="item">
                  <h4 class="item-title">Current Week</h4>
                  <p class="number">${this.pageData && numFormat(this.pageData.CurrentWeek)}</p>
                </div>
                <div class="item">
                  <h4 class="item-title">Previous Week</h4>
                  <p class="number number2">${this.pageData && numFormat(this.pageData.PreviousWeek)}</p>
                </div>
              </div>
              <div class="float-text">
                <p class="txt">Today's Earning: $2,562.30</p>
                <p class="tips">Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus...</p>
                <a-button type="dashed">
                  View Statements <a-icon type="arrow-right"></a-icon>
                </a-button>
              </div>
              <div style="height: 364px; margin-top: 40px" class="chartjs-chart">
                <canvas height="100px" id="LineChart"></canvas>
              </div>
            </a-card>
          </a-col>
          <a-col span={8} xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <a-card loading={this.loading} class="dash-box total-wrap">
              <h2 class="title">Total Sales</h2>
              <a-icon class="opreat" type="ellipsis"></a-icon>
              <div class="filter-wrap">
                <a-radio-group defaultValue="a" buttonStyle="solid">
                  <a-radio-button value="a">Today</a-radio-button>
                  <a-radio-button value="b">Yesterday</a-radio-button>
                  <a-radio-button value="c">A Week</a-radio-button>
                  <a-radio-button value="d">A Month</a-radio-button>
                </a-radio-group>
                <span class="tips">Please select filter time</span>
              </div>
              <div style="height: 225px; margin-top: 40px" class="chartjs-chart">
                <canvas height="100px" id="Doughnut"></canvas>
              </div>
              <div class="chart-widget-list">
                <p>
                  <i class="mdi mdi-square text-primary"></i> Direct
                  <span class="fr">$300.56</span>
                </p>
                <p>
                  <i class="mdi mdi-square text-danger"></i> Affilliate
                  <span class="fr">$135.18</span>
                </p>
                <p>
                  <i class="mdi mdi-square text-success"></i> Sponsored
                  <span class="fr">$48.96</span>
                </p>
                <p class="mb-0">
                  <i class="mdi mdi-square"></i> E-mail
                  <span class="fr">$154.02</span>
                </p>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </div>
    );
  }
}
