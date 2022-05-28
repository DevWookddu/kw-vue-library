const { titleLogger } = require('../utils/color-logger');
const { spawnSync } = require('child_process');

console.info(titleLogger('library total build'));

const { status } = spawnSync('npm.cmd', ['run', 'build:lib'], { encoding: 'utf8', stdio: 'inherit' });

if (status === 1) {
  process.exit(1);
}
