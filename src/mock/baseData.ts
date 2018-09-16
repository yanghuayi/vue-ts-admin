interface returnData {
  result: {
    resultCode: number,
    resultMessage: string,
  },
  entity: null | object | string | number,
}
export default function baseData(type: string, message: string, code?: number): returnData {
  let resultCode = 0;
  if (code) {
    resultCode = code;
  } else {
    resultCode = type === 'success' ? 0 : 1;
  }
  return {
    result: { resultCode, resultMessage: message },
    entity: null,
  };
}
