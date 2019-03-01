import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import {
  Button, Slider, Select, Tooltip,
} from 'ant-design-vue';
import coordTrasns from '@/utils/coordTrasns';
import { loadBmap, loadMapInfoBox, loadCanvasLayer } from '@/utils/index';
import commonfun from './commonfun';
import traData from './data.json';
import MapControl from './mapControl';
import './index.less';

function getTimeDay(day: number) { }

@Component({
  name: 'Trajectory',
  components: {
    'a-button': Button,
    'a-slider': Slider,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-tooltip': Tooltip,
  },
})
export default class Trajectory extends Vue {
  BMap: any = null;

  // 百度地图对象
  SMap: any = null;

  // 当前地图对象实例
  SMapZoom: number = 15;

  // 当前地图对象zoom
  geolocationControl: any = null;

  // 定位
  CanvasLayer: any = null;

  // 轨迹渲染层
  mapCenter: {
    lat: number,
    lng: number
  } = {
    lat: 29.563694,
    lng: 106.560421,
  };

  CarPoint: any = null;

  // 车辆位置
  CarIcon: any = null;

  // 车辆图标
  CarMarker: object[] = [];

  // 车辆标记
  tableUrl: string = '';

  mapContorl: any = null;

  // 地图方法类
  constructor(dataIndexs: any) {
    super(dataIndexs);
    loadBmap().then((BMap: any) => {
      this.BMap = BMap;
      this.SMap = new BMap.Map('map', { enableMapClick: false });
      this.SMap.centerAndZoom(new BMap.Point(this.mapCenter.lng, this.mapCenter.lat), 15);
      this.geolocationControl = new BMap.GeolocationControl();
      this.geolocationControl.addEventListener('locationSuccess', () => {
        console.log('locationSuccess');
      });
      this.SMap.enableScrollWheelZoom(true);
      loadMapInfoBox().then((BMapLib: any) => {
        this.mapContorl = new MapControl({ SMap: this.SMap });
        this.getData();
      });
      loadCanvasLayer().then((CanvasLayer: any) => {
        this.CanvasLayer = CanvasLayer;
      });
    });
  }

  currentTrackData = [];

  first = true;

  exportBtn: boolean = true;

  canvasLayer: any = null;

  canvasLayerBack: any = null;

  CanvasLayerPointer: any = null;

  canvasBehavior: any = null;

  pointCollection: any = [];

  utc2now(time: string) {
    const date = new Date(time);
    const str = date.getTime() + (8 * 60 * 60 * 1000); // 转换成时间戳+8小时
    const nowDate = new Date(str);
    return moment(nowDate).format('yyyy-MM-dd hh:mm:ss');
  }

  /**
   * view内部，绘制轨迹线路
   *
   * @param {Array} data 轨迹数据 可选
   * @param {number} starttime 时间区间起点 可选
   * @param {number} endtime 时间区间终点 可选
   */
  trackView = (data: any) => {
    const self = this;
    if (!data) {
      data = this.currentTrackData;
    }
    const that = this;
    const totalPoints: any = [];
    const viewportPoints = [];
    if (data.length === 0) {
      return;
    }
    for (let i = 0; i < data.length; i += 1) {
      const tempPoint = new this.BMap.Point(data[i].lng, data[i].lat);
      tempPoint.speed = data[i].obdSpeed ? data[i].obdSpeed : data[i].gpsSpeed;
      tempPoint.uTCTime = this.utc2now(data[i].utctime);
      tempPoint.direction = data[i].direction;
      tempPoint.printSpeed = commonfun.getSpeed(data[i].speed);
      tempPoint.lnglat = `${data[i].lng.toFixed(2)},${data[i].lat.toFixed(2)}`;
      tempPoint.event = data[i].events;
      totalPoints.push(tempPoint);
    }
    if (that.first) {
      this.SMap.setViewport(totalPoints, { margins: [20, 0, 0, 20] });
    }
    function updateBack() {
      const nextArray = [];
      const ctx = self.canvasLayerBack.canvas.getContext('2d');
      if (!ctx) {
        return;
      }
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      if (totalPoints.length !== 0) {
        for (let i = 0, len = totalPoints.length; i < len - 1; i += 1) {
          const pixel = self.SMap.pointToPixel(totalPoints[i]);
          const nextPixel = self.SMap.pointToPixel(totalPoints[i + 1]);
          ctx.beginPath();
          ctx.moveTo(pixel.x, pixel.y);
          ctx.lineWidth = 8;
          ctx.strokeStyle = '#8b8b89';
          ctx.lineTo(nextPixel.x, nextPixel.y);
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }
    }
    function update() {
      const ctx = self.canvasLayer.canvas.getContext('2d');
      if (!ctx) {
        return;
      }
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      if (totalPoints.length !== 0) {
        // 绘制带速度颜色的轨迹
        for (let i = 0, len = totalPoints.length; i < len - 2; i += 1) {
          const pixel = self.SMap.pointToPixel(totalPoints[i]);
          const nextPixel = self.SMap.pointToPixel(totalPoints[i + 1]);
          ctx.beginPath();
          ctx.moveTo(pixel.x, pixel.y);
          ctx.lineCap = 'round';
          ctx.lineWidth = 6;
          const grd = ctx.createLinearGradient(pixel.x, pixel.y, nextPixel.x, nextPixel.y);
          const { speed } = totalPoints[i];
          const speedNext = totalPoints[i + 1].speed;
          grd.addColorStop(0, self.getColorBySpeed(speed));
          grd.addColorStop(1, self.getColorBySpeed(speedNext));
          ctx.strokeStyle = grd;
          ctx.lineTo(nextPixel.x, nextPixel.y);
          ctx.stroke();
        }
      }
    }
    function updatePointer() {
      const ctx = self.CanvasLayerPointer.canvas.getContext('2d');
      if (!ctx) {
        return;
      }
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      if (totalPoints.length !== 0) {
        const lineObj = {};
        let pixelPart = 0;
        for (let i = 0, len = totalPoints.length; i < len - 1; i += 1) {
          const pixel = self.SMap.pointToPixel(totalPoints[i]);
          const nextPixel = self.SMap.pointToPixel(totalPoints[i + 1]);

          ctx.beginPath();
          pixelPart += Math.abs(nextPixel.x - pixel.x) + Math.abs(nextPixel.y - pixel.y);
          // 根据渲染像素距离渲染箭头
          if (pixelPart > 40) {
            // 箭头一共需要5个点：起点、终点、中心点、箭头端点1、箭头端点2
            pixelPart = 0;
            const midPixel = new self.BMap.Pixel(
              (pixel.x + nextPixel.x) / 2,
              (pixel.y + nextPixel.y) / 2,
            );

            // 起点终点距离
            const distance = (((nextPixel.x - pixel.x) ** 2)
              + ((nextPixel.y - pixel.y) ** 2)) ** 0.5;
            // 箭头长度
            const pointerLong = 4;
            const aPixel: any = {};
            const bPixel: any = {};
            if (nextPixel.x - pixel.x === 0) {
              if (nextPixel.y - pixel.y > 0) {
                aPixel.x = midPixel.x - (pointerLong * (0.5 ** 0.5));
                aPixel.y = midPixel.y - (pointerLong * (0.5 ** 0.5));
                bPixel.x = midPixel.x + (pointerLong * (0.5 ** 0.5));
                bPixel.y = midPixel.y - (pointerLong * (0.5 ** 0.5));
              } else if (nextPixel.y - pixel.y < 0) {
                aPixel.x = midPixel.x - (pointerLong * (0.5 ** 0.5));
                aPixel.y = midPixel.y + (pointerLong * (0.5 ** 0.5));
                bPixel.x = midPixel.x + (pointerLong * (0.5 ** 0.5));
                bPixel.y = midPixel.y + (pointerLong * (0.5 ** 0.5));
              } else {
                // continue;
              }
            } else {
              const k0 = (
                (
                  (-(2 ** 0.5) * distance * pointerLong)
                  + (2 * (nextPixel.y - pixel.y) * midPixel.y)
                ) / (2 * (nextPixel.x - pixel.x))) + midPixel.x;
              const k1 = -((nextPixel.y - pixel.y) / (nextPixel.x - pixel.x));
              const a = (k1 ** 2) + 1;
              const b = (2 * k1 * (k0 - midPixel.x)) - (2 * midPixel.y);
              const c = (((k0 - midPixel.x) ** 2) + (midPixel.y ** 2)) - (pointerLong ** 2);

              aPixel.y = (-b + (((b * b) - (4 * a * c)) ** 0.5)) / (2 * a);
              bPixel.y = (-b - (((b * b) - (4 * a * c)) ** 0.5)) / (2 * a);
              aPixel.x = (k1 * aPixel.y) + k0;
              bPixel.x = (k1 * bPixel.y) + k0;
            }
            ctx.moveTo(aPixel.x, aPixel.y);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#eee';
            ctx.lineTo(midPixel.x, midPixel.y);
            ctx.lineTo(bPixel.x, bPixel.y);
            ctx.lineCap = 'round';
            ctx.stroke();
          }
        }
      }
    }
    function renderBehavior() {
      const Map = ['', '震', '碰', '碰', '翻', '加', '减', '弯'];
      const ColorMap = ['', '#52c41a', '#fa8c16', '#f5222d', '#eb2f96', '#1890ff', '#2f54eb', '#13c2c2'];
      const ctx: CanvasRenderingContext2D = self.canvasBehavior.canvas.getContext('2d');
      if (!ctx) {
        return;
      }
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const mulPoint: { x: number, y: number, event: string[] }[] = [];
      function addPoint(x: number, y: number, text: string, color: string, fontSize: string, type: 'one' | 'mul') {
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
        ctx.font = `bold ${fontSize} arial`;
        ctx.fillStyle = '#fff';
        ctx.fillText(text, type === 'one' ? x - 5.5 : x - 4, y + 4);
      }
      function hoverMul(x: number, y: number, event: string[]) {
        let py = 0;
        event.forEach((item) => {
          addPoint(x + py, y - 30, Map[parseInt(item, 10)], ColorMap[parseInt(item, 10)], '12px', 'one');
          py += 30;
        });
      }
      function removeMul(x: number, y: number, num: number) {
        ctx.clearRect(x - 10, y - 40, num * 30, 20);
      }
      function iconRender(x: number, y: number, url: string) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, x, y);
        };
        img.src = url;
      }
      if (totalPoints.length !== 0) {
        const oneXY = self.SMap.pointToPixel(totalPoints[0]);
        iconRender(oneXY.x - 13, oneXY.y - 26, require('@/assets/start.png'));
        const endXY = self.SMap.pointToPixel(totalPoints[totalPoints.length - 1]);
        iconRender(endXY.x - 13, endXY.y - 26, require('@/assets/end.png'));
        for (let i = 0, len = totalPoints.length; i < len - 1; i += 1) {
          if (totalPoints[i].event && totalPoints[i].event[0] !== '0') {
            const pixel = self.SMap.pointToPixel(totalPoints[i]);
            if (totalPoints[i].event.length === 1) {
              addPoint(pixel.x, pixel.y, Map[parseInt(totalPoints[i].event[0], 10)], ColorMap[parseInt(totalPoints[i].event[0], 10)], '12px', 'one');
            } else {
              addPoint(pixel.x, pixel.y, totalPoints[i].event.length, '#faad14', '14px', 'mul');
              mulPoint.push({
                x: pixel.x,
                y: pixel.y,
                event: totalPoints[i].event,
              });
            }
          }
        }
        if (mulPoint.length) {
          self.canvasBehavior.canvas.addEventListener('mousemove', (e: MouseEvent) => {
            mulPoint.forEach((item) => {
              if (Math.abs(e.pageX - item.x - 200) < 5 && Math.abs(e.pageY - item.y - 100) < 5) {
                hoverMul(item.x, item.y, item.event);
              } else {
                removeMul(item.x, item.y, item.event.length);
              }
            });
          });
        }
      }
    }
    const render = () => {
      if (totalPoints.length > 0) {
        if (this.canvasLayer || this.canvasLayerBack
          || this.CanvasLayerPointer || this.canvasBehavior) {
          this.SMap.removeOverlay(this.CanvasLayerPointer);
          this.SMap.removeOverlay(this.canvasLayer);
          this.SMap.removeOverlay(this.canvasLayerBack);
          this.SMap.removeOverlay(this.canvasBehavior);
        }
        // 轨迹边框渲染
        this.canvasLayerBack = new this.CanvasLayer({
          map: this.SMap,
          update: updateBack,
        });
        // 轨迹渐变渲染
        this.canvasLayer = new this.CanvasLayer({
          map: this.SMap,
          update,
        });
        // 轨迹箭头渲染
        this.CanvasLayerPointer = new this.CanvasLayer({
          map: this.SMap,
          update: updatePointer,
        });
        // 驾驶行为层
        this.canvasBehavior = new this.CanvasLayer({
          map: this.SMap,
          update: renderBehavior,
        });
      }
      const options = {
        size: window.BMAP_POINT_SIZE_HUGE,
        shape: window.BMAP_POINT_SHAPE_CIRCLE,
        color: 'rgba(0, 0, 0, 0)',
      };
      // 初始化PointCollection
      if (this.pointCollection) {
        this.SMap.removeOverlay(this.pointCollection);
      }
      this.pointCollection = new this.BMap.PointCollection(totalPoints, options);
      this.pointCollection.addEventListener('click', (e: any) => {
        this.mapContorl.showTrackInfoBox({
          ...e.point,
          plateNum: this.getPlateNum(),
          status: e.point.printSpeed,
          point: e.point,
        });
      });
      this.pointCollection.addEventListener('mouseover', (e: any) => {
        this.mapContorl.addTrackPointOverlay(e, 'trackpoint_over');
      });
      this.pointCollection.addEventListener('mouseout', (e: any) => {
        this.mapContorl.removeTrackPointOverlay('trackpoint_over');
      });
      // 添加Overlay
      this.SMap.addOverlay(this.pointCollection);
    };
    if (that.first) {
      setTimeout(() => render(), 100);
    } else {
      render();
    }
  }

  getPlateNum() {
    return this.plateNum;
  }

  // 根据速度获取相应颜色
  getColorBySpeed = (speed: number) => {
    let color = '';
    let red: string | number = 0;
    let green: string | number = 0;
    let blue: string | number = 0;
    speed = speed > 100 ? 100 : speed;
    switch (Math.floor(speed / 25)) {
      case 0:
        red = 187 + Math.ceil(((241 - 187) / 25) * speed);
        green = 0 + Math.ceil(((48 - 0) / 25) * speed);
        blue = 0 + Math.ceil(((48 - 0) / 25) * speed);
        break;
      case 1:
        speed -= 25;
        red = 241 + Math.ceil(((255 - 241) / 25) * speed);
        green = 48 + Math.ceil(((200 - 48) / 25) * speed);
        blue = 48 + Math.ceil(((0 - 48) / 25) * speed);
        break;
      case 2:
        speed -= 50;
        red = 255 + Math.ceil(((22 - 255) / 25) * speed);
        green = 200 + Math.ceil(((191 - 200) / 25) * speed);
        blue = 0 + Math.ceil(((43 - 0) / 25) * speed);
        break;
      case 3:
        speed -= 75;
        red = 85 + Math.ceil(((22 - 85) / 25) * speed);
        green = 170 + Math.ceil(((191 - 170) / 25) * speed);
        blue = 0 + Math.ceil(((85 - 0) / 25) * speed);
        break;
      case 4:
        red = 85;
        green = 170;
        blue = 85;
        break;
      default: break;
    }

    red = red
      .toString(16)
      .length === 1
      ? `0${red.toString(16)}`
      : red.toString(16);
    green = green
      .toString(16)
      .length === 1
      ? `0${green.toString(16)}`
      : green.toString(16);
    blue = blue
      .toString(16)
      .length === 1
      ? `0${blue.toString(16)}`
      : blue.toString(16);
    color = `#${red}${green}${blue}`;
    return color;
  }

  timeChange(val: string) {
    console.log(val);
  }

  // 增加zoom
  zoomAdd = () => {
    const newZoom = this.SMap.getZoom() + 1;
    this.SMap.setZoom(newZoom);
  }

  // 减少zoom
  zoomReduce = () => {
    const newZoom = this.SMap.getZoom() - 1;
    this.SMap.setZoom(newZoom);
  }

  plateNum = '';

  behaivorData: { num: number, txt: string }[] = [];

  getData() {
    this.behaivorData = [
      { num: 0, txt: '轻震动' },
      { num: 0, txt: '轻碰撞' },
      { num: 0, txt: '重碰撞' },
      { num: 0, txt: '翻滚' },
      { num: 0, txt: '急加速' },
      { num: 0, txt: '急减速' },
      { num: 0, txt: '急转弯' },
    ];
    let data = traData.entity;
    data = data.map((item: any, index: number) => {
      const point = coordTrasns.transToBaidu(item, 'bd09ll');
      item.lat = point.lat;
      item.lng = point.lng;
      if (item.events) {
        item.events.forEach((items: string) => {
          if (items !== '0') {
            this.behaivorData[parseInt(items, 10) - 1].num += 1;
          }
        });
      }
      return item;
    });
    this.currentTrackData = data;
    this.trackView(data);
    // 设置轨迹播放时间-1小时轨迹播放时长为1分钟
    this.playTime = this.timeFormat(60);
    this.defaultTime = this.playTime;
  }

  /**
   * 播放轨迹动画-start
   */
  playOnTime: number = 0;

  // 播放当前时间点
  defaultTime: string = '';

  playTime: string = '1:00';

  // 播放时长
  playStatus: boolean = false;

  // 播放状态
  playMultiple: number = 1;

  // 播放速度
  timeFormat(val: number) { // 格式化时间
    return `${parseInt((val / 60).toString(), 10)}:${(val % 60) < 10 ? `0${(val % 60).toFixed(0)}` : (val % 60).toFixed(0)}`;
  }

  playTimeNumber(time: string) {
    const timeArr = time.split(':');
    let timeNumber = 0;
    timeNumber += parseInt(timeArr[0], 10) * 60;
    timeNumber += parseInt(timeArr[1], 10);
    return timeNumber;
  }

  // 播放seInterval值
  playTimer: any = null;

  // 是否第一次播放轨迹
  firstPlay: boolean = true;

  getTrackData() {
    return this.currentTrackData;
  }

  getMapContorl = () => this.mapContorl

  // 播放轨迹动画
  trackPlay() {
    const mapContorl = this.getMapContorl();
    if (this.firstPlay) {
      mapContorl.initMapPlay(this.getTrackData(), this.playTimeNumber(this.playTime));
      this.firstPlay = false;
    }
    if (this.playStatus) {
      this.playStatus = false;
      clearInterval(this.playTimer);
      mapContorl.passPlay();
    } else {
      this.playStatus = true;
      mapContorl.playContinue();
      this.playTimer = setInterval(() => {
        if (this.playOnTime === this.playTimeNumber(this.playTime)) {
          clearInterval(this.playTimer);
          this.playStatus = false;
          this.playOnTime = 0;
          this.firstPlay = true;
          this.getMapContorl().clearPlay();
        } else {
          this.playOnTime += 1;
        }
      }, 1000);
    }
  }

  jumpPlay(val: number) {
    this.getMapContorl().jumpPlay(val);
  }

  clearPlay() {
    // this.trackPlay();
    clearInterval(this.playTimer);
    this.playOnTime = 0;
    this.playStatus = false;
    this.firstPlay = true;
    this.getMapContorl().clearPlay();
  }

  playChange(val: number) {
    this.playTime = this.timeFormat(this.playTimeNumber(this.defaultTime) / val);
    this.clearPlay();
    this.getMapContorl().playSetTime(this.playTimeNumber(this.defaultTime) / val);
  }

  /**
   * 播放轨迹动画-end
   */
  render() {
    return (
      <div class="trajectory-wrap">
        <ul class="behavior-list">
          {
            this.behaivorData && this.behaivorData.map(item => <li>
              <span class="number">{item.num}</span>
              <span className="txt">{item.txt}</span>
            </li>)
          }
        </ul>
        <div id="map"></div>
        {
          this.currentTrackData.length
            ? <div class="play-box">
              <i on-click={this.trackPlay} class={`play-icon iconfont-${this.playStatus ? 'pass' : 'play'}`}></i>
              <span class="dot-left">{this.timeFormat(this.playOnTime)}</span>
              <a-slider
                v-model={this.playOnTime}
                max={this.playTimeNumber(this.playTime)}
                on-change={this.jumpPlay}
                tipFormatter={this.timeFormat}>
              </a-slider>
              <span class="dot-right">{this.playTime}</span>
              <a-select v-model={this.playMultiple} on-change={this.playChange} placeholder="请选择">
                <a-select-option key={0} value={0.3}>0.3x</a-select-option>
                <a-select-option key={1} value={0.5}>0.5x</a-select-option>
                <a-select-option key={2} value={0.8}>0.8x</a-select-option>
                <a-select-option key={3} value={1}>1x</a-select-option>
                <a-select-option key={4} value={1.5}>1.5x</a-select-option>
                <a-select-option key={5} value={2}>2x</a-select-option>
                <a-select-option key={6} value={3}>3x</a-select-option>
              </a-select>
            </div> : null
        }
      </div>
    );
  }
}
