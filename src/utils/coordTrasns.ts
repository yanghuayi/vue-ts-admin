/**
 * 'bd09ll' 百度坐标系
 * 'gcj02ll' 火星坐标系
 */
type CoordSys = 'bd09ll' | 'gcj02ll';
export default class coordTrasns {
  static gcj2bd(lat: number, lon: number) {
    // 世界大地坐标转为百度坐标
    const xpi = (3.14159265358979324 * 3000.0) / 180.0;
    const x = lon;
    const y = lat;
    const z = Math.sqrt((x * x) + (y * y)) + (0.00002 * Math.sin(y * xpi));
    const theta = Math.atan2(y, x) + (0.000003 * Math.cos(x * xpi));
    const bdLon = (z * Math.cos(theta)) + 0.0065;
    const bdLat = (z * Math.sin(theta)) + 0.006;
    const result = { lat: 0, lng: 0 };
    result.lng = bdLon;
    result.lat = bdLat;
    return result;
  }

  static transToBaidu(piont: { lat: number, lng: number }, coordSys: CoordSys) {
    if (coordSys === 'gcj02ll') {
      return this.gcj2bd(piont.lat, piont.lng);
    }
    return piont;
  }
}
