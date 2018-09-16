interface Window {
  BMap: any,
  BMapLib: any,
  wangEditor: any,
  CanvasLayer: any,
  pointCollection: any,
  BMAP_POINT_SIZE_HUGE: any,
  BMAP_POINT_SHAPE_CIRCLE: any,
  BMAP_DRAWING_CIRCLE: any,
  BMAP_DRAWING_POLYGON: any,
  BMAP_DRAWING_RECTANGLE: any,
  G2 : any,
}

interface Date {
  Format(fmt : string): string
}

declare module 'ant-design-vue/lib/locale-provider/zh_CN' {
  const zh_CN: any;
  export default zh_CN;
}
