const clc = require('cli-color');

const warn = clc.cyan;
const notice = clc.yellow;
const error = clc.red;
const success = clc.xterm(79);

exports.error = error;
exports.warn = warn;
exports.notice = notice;
exports.success = success;
exports.titleLogger = (title) => notice(`============= ${title}`);
exports.successLogger = (title) => success(`>> ${title}`);
exports.keyValueLogger = (key, value) => `${clc.green(key)} ==> ${clc.green(value)}`;
