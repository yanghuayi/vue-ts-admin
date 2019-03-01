module.exports = (file: string) => {
  'use strict';

  return (resolve: any) => require([`@/views/${file}`], resolve);
};
