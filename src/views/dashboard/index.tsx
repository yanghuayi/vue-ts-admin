import { Component, Vue } from 'vue-property-decorator';
import { Button, DatePicker, Modal } from 'ant-design-vue';
import './index.less';

@Component({
  components: {
  'a-button': Button,
  'a-date-picker': DatePicker,
  'a-modal': Modal,
  }
  })
export default class Dashboard extends Vue {
  // 告警数据
  alarmData: any = [
    { name: '驶出围栏1', count: 1 },
    { name: '驶出围栏2', count: 2 },
    { name: '驶出围栏3', count: 3 },
    { name: '驶出围栏4', count: 4 },
    { name: '驶出围栏5', count: 5 },
    { name: '驶出围栏6', count: 6 },
    { name: '驶出围栏7', count: 7 },
    { name: '驶出围栏8', count: 8 },
    { name: '驶出围栏9', count: 9 },
  ]
  // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
  // 圆环数据
  circleData: any = [
    { item: '在线', count: 40, percent: 0.8 },
    { item: '离线', count: 21, percent: 0.2 },
  ];
  columData: any = [
    { name: '急加速', num: 38 },
    { name: '急减速', num: 41 },
    { name: '急转弯', num: 56 },
    { name: '轻碰撞', num: 23 },
    { name: '重碰撞', num: 10 },
    { name: '翻滚', num: 69 },
  ];

  // 行驶数据
  driveData: any = [
    { name: '行驶次数', count: 40, bgColor: '#339999' },
    { name: '行驶里程', count: 40, bgColor: '#437BBD' },
    { name: '行驶时间', count: 40, bgColor: '#C37F42' },
    { name: '耗油量', count: 40, bgColor: '#9A3FC0' },
    { name: '平均油耗', count: 40, bgColor: '#CC5676' },
  ];
  // 行驶数据排行
  driveRankData: any = [
    {
      name: '行驶次数',
      arr: [
        { plateNum: '渝BPA418', count: 80 },
        { plateNum: '渝BPA418', count: 70 },
        { plateNum: '渝BPA418', count: 60 },
      ],
    },
    {
      name: '行驶里程',
      arr: [
        { plateNum: '渝BPA418', count: 80 },
        { plateNum: '渝BPA418', count: 70 },
        { plateNum: '渝BPA418', count: 60 },
      ],
    },
    {
      name: '行驶时间',
      arr: [
        { plateNum: '渝BPA418', count: 80 },
        { plateNum: '渝BPA418', count: 70 },
        { plateNum: '渝BPA418', count: 60 },
      ],
    },
    {
      name: '耗油量',
      arr: [
        { plateNum: '渝BPA418', count: 80 },
        { plateNum: '渝BPA418', count: 70 },
        { plateNum: '渝BPA418', count: 60 },
      ],
    },
    {
      name: '平均油耗',
      arr: [
        { plateNum: '渝BPA418', count: 80 },
        { plateNum: '渝BPA418', count: 70 },
        { plateNum: '渝BPA418', count: 60 },
      ],
    },
  ];

  count: number = 100;
  helloWord: string = ''
  // 搜索时间范围
  nowDate: any = ''
  startTime: string = ''
  endTime: string = ''
  defaultTime: any = [
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
  ]

  todayActive: boolean = true;
  sevendayActive: boolean = false;
  thirtydayActive: boolean = false;
  allActive: boolean = false;

  openVisible: boolean = false;

  mounted() {
    // 环状图表
    const circleChart = new window.G2.Chart({
      container: 'mountNode',
      forceFit: false,
      height: 300,
      width: 300,
      animate: true,
    });
    circleChart.source(this.circleData, {
      percent: {
        formatter: function formatter(val: any) {
          val = `${val * 100}%`;
          return val;
        },
      },
    });
    circleChart.coord('theta', {
      radius: 0.70,
      innerRadius: 0.65,
    });
    circleChart.tooltip({
      showTitle: false,
      itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
    });
    // 辅助文本
    circleChart.guide().html({
      position: ['50%', '50%'],
      html: '<div style="color:#333333;font-size: 14px;text-align: center;width: 10em;">运行车辆<br><span style="color:#333333;font-size:20px">200</span>台</div>',
      alignX: 'middle',
      alignY: 'middle',
    });
    circleChart.intervalStack()
      .position('percent')
      .color('item', ['#00CA68', '#F25D56'])
      .label('percent', {
        formatter: function formatter(val: any, item: any) {
          return `${item.point.item}:${val}`;
        },
      })
      .style({
        lineWidth: 2,
        stroke: '#fff',
      });
    circleChart.render();

    // 柱状图
    const columnarChart = new window.G2.Chart({
      container: 'columnar',
      forceFit: true,
      height: 370,
      animate: true,
    });

    columnarChart.source(this.columData);
    columnarChart.scale('num', {
      tickInterval: 10,
    });
    columnarChart
      .interval()
      .position('name*num');
    columnarChart.render();
    // 时间
    this.nowDate = new Date();// 获取系统当前时间
    const myTime = this.nowDate.getHours() + (this.nowDate.getMinutes() * 0.01);
    this.setHelloWord(myTime);
  }
  setHelloWord(time: any) {
    if (time > 0 && time < 12) {
      this.helloWord = '早上';
    } else if (time > 12 && time < 19) {
      this.helloWord = '下午';
    } else {
      this.helloWord = '晚上';
    }
  }
  goMonitor() {
    this.$router.push({ name: '车辆监控' });
  }

  timeForMat(count: number) {
    // 拼接时间
    // 当前时间
    const time1 = new Date();
    time1.setTime(time1.getTime());
    const Y1 = time1.getFullYear();
    const M1 = ((time1.getMonth() + 1) > 10 ? (time1.getMonth() + 1) : `0${time1.getMonth() + 1}`);
    const D1 = (time1.getDate() > 10 ? time1.getDate() : `0${time1.getDate()}`);
    const timer1 = `${Y1}-${M1}-${D1}`;
    // 之前的7天或者30天
    const time2 = new Date();
    time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count));
    const Y2 = time2.getFullYear();
    const M2 = ((time2.getMonth() + 1) > 9 ? (time2.getMonth() + 1) : `0${time2.getMonth() + 1}`);
    const D2 = (time2.getDate() > 9 ? time2.getDate() : `0${time2.getDate()}`);
    const timer2 = `${Y2}-${M2}-${D2}`;
    return {
      t1: timer1,
      t2: timer2,
      Y2,
      M2,
      D2,
    };
  }
  cancelAllActive() {
    this.todayActive = false;
    this.sevendayActive = false;
    this.thirtydayActive = false;
    this.allActive = false;
  }

  toDayData() {
    this.cancelAllActive();
    this.todayActive = true;
    const time = this.nowDate.toLocaleDateString().split('/').join('-');
    this.startTime = time;
    this.endTime = time;
    this.defaultTime = [
      new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
    ];
  }


  sevenData() {
    this.cancelAllActive();
    this.sevendayActive = true;
    const timer = this.timeForMat(7);
    this.startTime = timer.t2;
    this.endTime = timer.t1;
    this.defaultTime = [
      new Date(timer.Y2, Number(timer.M2) - 1, Number(timer.D2)),
      new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
    ];
  }

  thirtyData() {
    this.cancelAllActive();
    this.thirtydayActive = true;
    const timer = this.timeForMat(30);
    this.startTime = timer.t2;
    this.endTime = timer.t1;
    this.defaultTime = [
      new Date(timer.Y2, Number(timer.M2) - 1, Number(timer.D2)),
      new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
    ];
  }

  allData() {
    this.cancelAllActive();
    this.allActive = true;
    this.startTime = '';
    this.endTime = '';
    this.defaultTime = [];
  }

  timeSelect(data: any) {
    this.cancelAllActive();
    if (data) {
      const t1 = data[0];
      const t2 = data[1];
      this.startTime = t1;
      this.endTime = t2;
    }
  }
  openLink() {
    this.openVisible = true;
  }

  closeDialog() {
    this.openVisible = false;
  }

  render(h: any) {
    return (
      <div class="container">
        <div class="monitorArea">
          <div class="mask"></div>
          <div class="monitorCenter">
            <div id="mountNode" class="mountNode"></div>
            <div class="title">
              <span style="marginRight:20px">{this.helloWord}好！当前{this.count}辆车处于监控中</span>
              <el-button type="primary" id="goMonitor" plain size="small" class="iconfont iconfont-monitor" on-click={this.goMonitor}>   进入监控</el-button>
            </div>
          </div>
          <el-button type="success" id="openLink" plain size="mini" class="iconfont iconfont-link openLink" on-click={this.openLink}>   开放接口</el-button>
        </div>
        <div class="driveArea">
          <div class="title">
            行驶数据统计
          </div>
          <div class="timeSet">
            <ul class="normalTime">
              <li
                id="toDay"
                class={['item', this.todayActive ? 'active' : '']}
                on-click={this.toDayData}
              >
                今天
              </li>
              <li
                id="sevenDay"
                class={['item', this.sevendayActive ? 'active' : '']}
                on-click={this.sevenData}
              >
                近7天
              </li>
              <li
                id="thirtyDay"
                class={['item', this.thirtydayActive ? 'active' : '']}
                on-click={this.thirtyData}
              >
                近30天
              </li>
              <li
                id="allDay"
                class={['item', this.allActive ? 'active' : '']}
                on-click={this.allData}
              >
                全部
              </li>
            </ul>
            <a-date-picker
              id="datePicker"
              v-model={this.defaultTime}
              class="datePicker"
              type="daterange"
              // default-value={this.defaultTime}
              size="mini"
              value-format="yyyy-MM-dd"
              on-change={(val: any) => this.timeSelect(val)}
              range-separator="至"
              start-placeholder="开始"
              end-placeholder="结束">
            </a-date-picker>
          </div>
          <div class="driveBox">
            <div class="leftPart">
              <ul class="top">
                {
                  this.driveData.map((item: any) =>
                    <li class="item">
                      {item.name}
                      <br />
                      {item.count}次
                  </li>)
                }
              </ul>
              <div id="columnar" class="columnar"></div>
            </div>
            <ul class="rightPart">
              {
                this.driveRankData.map((item: any) => <li class="item">
                  <div class="name">
                    {item.name}
                    <span class="arrow arrowColor"></span>
                  </div>
                  <ul class="carList">
                    {
                      item.arr.map((data: any) => <li class="carDetail">
                        <span>{data.plateNum}</span>
                        <span>{data.count}</span>
                      </li>)
                    }
                  </ul>
                </li>)
              }
            </ul>
          </div>
        </div>
        <div class="alarmArea">
          <div class="title">
            告警消息统计
          </div>
          <ul class="alarmData">
            {
              this.alarmData.map((item: any) => <li class="alarmItem">
                <span>{item.name}</span>
                <span><span style="color:red">{item.count}</span>次</span>
              </li>)
            }
          </ul>
        </div>
        <a-modal
          class="openInfo"
          title="开放接口"
          visible={this.openVisible}
          width="520px"
          before-close={this.closeDialog}>
          <p class="title">您的平台接口对接秘钥</p>
          <p class="key">1akshndgkljfdhuif</p>
          <p class="webAddress">
            接口地址：
            <a href="http://www.qq.com" target="_blank">
              <span style="color:#1890ff">www.jiekouwendang.com</span>
            </a>
          </p>
        </a-modal>
      </div >
    );
  }
}
