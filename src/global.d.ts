interface Window {
  api: any,
  Fetch: any,
  apexCharts: any,
  ApexCharts: any,
}

interface Date {
  Format(fmt : string): string
}

interface returnData {
  success: boolean,
  message: string,
  statusCode: number,
  data: any,
}


declare module 'ant-design-vue/lib/locale-provider/zh_CN' {
  const zh_CN: any;
  export default zh_CN;
}

