module.exports = function baseData(type, message, code) {
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
};
