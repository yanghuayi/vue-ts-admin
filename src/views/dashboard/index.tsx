import { Component, Vue } from 'vue-property-decorator';
import { Button, DatePicker, Modal, Row, Col, Card, Icon } from 'ant-design-vue';
import './index.less';

@Component({
  components: {
  'a-button': Button,
  'a-date-picker': DatePicker,
  'a-modal': Modal,
  'a-row': Row,
  'a-col': Col,
  'a-card': Card,
  'a-icon': Icon,
  }
  })
export default class Dashboard extends Vue {
  created() {
    window.api.dashboard(null).then((res: returnData) => {
      const { totalSalesList } = res.data;
    });
  }
  totalSalesList: any = []

  totalSalesChart: any = null
  init() {
  }

  ColLayout: any = {
    span: 12,
    lg: 12,
    md: 12,
    sm: 24,
  }

  render() {
    return (
      <div class="container">
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }} class="dash-col">
          <a-col span={8}>
            <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
              <a-col {...{ props: this.ColLayout }} class="sub-item">
                <a-card class="dash-card">
                  <h3>Customers</h3>
                  <a-icon class="icon" type="team"></a-icon>
                  <p class="number">36,254</p>
                  <div class="footer">
                    <span class="s-number green">
                      <a-icon type="arrow-up"></a-icon>
                      5.27%
                    </span>
                    <span class="txt">Since last month</span>
                  </div>
                </a-card>
              </a-col>
              <a-col {...{ props: this.ColLayout }} class="sub-item">
                <a-card class="dash-card">
                  <h3>Orders</h3>
                  <a-icon class="icon" type="shopping-cart"></a-icon>
                  <p class="number">5,543</p>
                  <div class="footer">
                    <span class="s-number red">
                      <a-icon type="arrow-down"></a-icon>
                      1.08%
                    </span>
                    <span class="txt">Since last month</span>
                  </div>
                </a-card>
              </a-col>
              <a-col {...{ props: this.ColLayout }} class="sub-item">
                <a-card class="dash-card">
                  <h3>Revenue</h3>
                  <a-icon class="icon" type="pay-circle"></a-icon>
                  <p class="number">$6,254</p>
                  <div class="footer">
                    <span class="s-number red">
                      <a-icon type="arrow-down"></a-icon>
                      7.00%
                    </span>
                    <span class="txt">Since last month</span>
                  </div>
                </a-card>
              </a-col>
              <a-col {...{ props: this.ColLayout }} class="sub-item">
                <a-card class="dash-card">
                  <h3>Growth</h3>
                  <a-icon class="icon" type="line-chart"></a-icon>
                  <p class="number">+30.56%</p>
                  <div class="footer">
                    <span class="s-number green">
                      <a-icon type="arrow-up"></a-icon>
                      4.87%
                    </span>
                    <span class="txt">Since last month</span>
                  </div>
                </a-card>
              </a-col>
            </a-row>
          </a-col>
          <a-col span={14}></a-col>
        </a-row>
      </div>
    );
  }
}
