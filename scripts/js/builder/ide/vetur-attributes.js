const fs = require('fs');
const path = require('path');
const paramCase = require('../../utils/param-case-with-number');
const jsonBeautify = require('json-beautify');
const { successLogger } = require('../../utils/color-logger');
const { pascalCase } = require('change-case');

const ROOT_PATH = path.resolve(__dirname, '../../../../');
const VETUR_ATTRIBUTES_PATH = path.join(ROOT_PATH, '/ide/vetur-attributes.json');

module.exports = (componentInfos = []) => {
  const obj = {};
  componentInfos.forEach((info) => {
    const paramCaseComponentName = pascalCase(info.componentName);
    info.props.forEach((prop) => {
      obj[`${paramCaseComponentName}/${paramCase(prop.name)}`] = {
        type: prop.type,
        description: prop.description || '설명 없음',
      };
    });
  });
  fs.writeFileSync(VETUR_ATTRIBUTES_PATH, jsonBeautify(obj, null, 2));
  console.info(successLogger('vetur-attributes.json 생성'));
};
