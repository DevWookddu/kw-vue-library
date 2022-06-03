const { titleLogger, error } = require('../utils/color-logger');
const { spawnSync } = require('child_process');
const jsonBeautify = require('json-beautify');
const { platform } = require('os');
const fs = require('fs');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../../../');

const ORIGIN_PACKAGE_JSON_PATH = path.join(ROOT_PATH, 'package.json');
const TARGET_RELEASE = 'release';
const TARGET_SNAPSHOT = 'snapshot';

const args = process.argv.slice(2);

const targetArgv = args.find((argv) => argv.startsWith('--target'));

const target = (targetArgv || '').replace('--target=', '');

console.info(titleLogger(`npm publish ==> ${target}`));

if (!target) {
  console.info(error(`--target=[${TARGET_SNAPSHOT}|${TARGET_RELEASE}] 인자 누락`));
  process.exit(1);
}

if (![TARGET_RELEASE, TARGET_SNAPSHOT].includes(target)) {
  console.info(error(`--target=${target}은 허용되지 않는 값입니다. [${TARGET_SNAPSHOT}|${TARGET_RELEASE}]`));
  process.exit(1);
}

const originPackageJsonString = fs.readFileSync(ORIGIN_PACKAGE_JSON_PATH, 'utf-8');
const packageJson = JSON.parse(originPackageJsonString);
const isSnapshot = target === TARGET_SNAPSHOT;

/**
 * 1. root 경로의 package.json을 복사.
 * 2. release의 경우, 버전 그대로 이용, snapshot의 경우 -snapshot 추가(ex: 0.1.4-snapshot)
 * 3. package.json 정보 수정 후, publish
 * 4. 이전 pakcage.json 정보로 복구.
 */
packageJson.version = `${packageJson.version}${isSnapshot ? '-snapshot' : ''}`;
packageJson.publishConfig = { registry: 'https://npmjs.org' };

fs.writeFileSync(ORIGIN_PACKAGE_JSON_PATH, jsonBeautify(packageJson, null, 2), 'utf-8');

const isWindow = platform().startsWith('win');
const npmCmd = `npm${isWindow ? '.cmd' : ''}`;

// snapshot unpublish
if (isSnapshot) {
  spawnSync(npmCmd, ['unpublish', `${packageJson.name}@${packageJson.version}`], {
    encoding: 'utf8',
    stdio: 'inherit',
  });
}

// publish
spawnSync(npmCmd, ['publish'], { encoding: 'utf8', stdio: 'inherit' });

fs.writeFileSync(ORIGIN_PACKAGE_JSON_PATH, originPackageJsonString, 'utf-8');
