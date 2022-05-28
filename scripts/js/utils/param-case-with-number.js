const { paramCase } = require('change-case');

module.exports = function (str) {
  let val = str;
  const groups = str.match(/((\D+)|(\d+))/g);
  val = groups.map((group) => (/\d+/g.test(group) ? `-${group}` : group)).join('');
  return paramCase(val);
};
