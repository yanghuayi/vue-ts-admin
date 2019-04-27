interface Window {
  api: {
    [key: string]: (
      data: any,
    ) => Promise<{
      success: boolean;
      message: string;
      statusCode: number;
      data: any;
    }>;
  };
  ajax: any;
  ApexCharts: any;
  BMap: any;
  BMapLib: any;
  wangEditor: any;
  CanvasLayer: any;
  pointCollection: any;
  BMAP_POINT_SIZE_HUGE: any;
  BMAP_POINT_SHAPE_CIRCLE: any;
  BMAP_DRAWING_CIRCLE: any;
  BMAP_DRAWING_POLYGON: any;
  BMAP_DRAWING_RECTANGLE: any;
}

interface Date {
  Format(fmt: string): string;
}

interface returnData {
  success: boolean;
  message: string;
  statusCode: number;
  data: any;
}

declare module '*.json';
