module.exports = (file: string) => {
  'use strict';

  return () => import(`@/views/${file}`);
};
