const path = require('path');
const fs = require('fs');

const componentParser = require('../../utils/component-parser');
const webTypesBuilder = require('./web-types');
const veturTagsBuilder = require('./vetur-tags');
const veturAttributesBuilder = require('./vetur-attributes');
const { notice } = require('../../utils/color-logger');

// 컴포넌트 경로
const ROOT_PATH = path.resolve(__dirname, '../../../../');
const COMPONENT_ROOT_PATH = path.join(ROOT_PATH, '/src/components');
const IDE_PATH = path.join(ROOT_PATH, '/ide');

// 컴포넌트 경로에서 디렉토리만 추출한 경로
const findFiles = (vueFilePathes, dirPath) => {
  const dirs = fs.readdirSync(dirPath);
  dirs.forEach((dir) => {
    const dirFullPath = path.resolve(dirPath, dir);
    const lstat = fs.lstatSync(dirFullPath);
    if (lstat.isDirectory()) {
      findFiles(vueFilePathes, dirFullPath);
    } else if (dir.endsWith('.vue')) {
      vueFilePathes.push(`${dirPath}/${dir}`);
    }
  });
};

const vueFilePathes = [];
findFiles(vueFilePathes, COMPONENT_ROOT_PATH);
console.info(vueFilePathes);
const componentInfos = componentParser(vueFilePathes);

// build
if (!fs.existsSync(IDE_PATH)) {
  fs.mkdirSync(IDE_PATH);
}

console.info(notice('\n'));
webTypesBuilder(componentInfos);
veturTagsBuilder(componentInfos);
veturAttributesBuilder(componentInfos);
