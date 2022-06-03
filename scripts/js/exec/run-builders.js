const { titleLogger } = require('../utils/color-logger');

// console.info(titleLogger('scss 빌드'));
// require('../builder/scss/builder');
// console.info();

console.info(titleLogger('ide types 빌드'));
require('../builder/ide/builder');
console.info();
