const fs = require('fs');
const path = require('path');
const paramCase = require('../../utils/param-case-with-number');
const jsonBeautify = require('json-beautify');
const { successLogger } = require('../../utils/color-logger');
const { pascalCase } = require('change-case');

const ROOT_PATH = path.resolve(__dirname, '../../../../');
const VETUR_TAGS_JSON_PATH = path.join(ROOT_PATH, '/ide/vetur-tags.json');

module.exports = (componentInfos = []) => {
  const tags = {};
  componentInfos.forEach((component) => {
    tags[pascalCase(component.componentName)] = {
      description: component.componentDescription,
      attributes: [...component.props.map((prop) => paramCase(prop.name))],
    };
  });
  fs.writeFileSync(VETUR_TAGS_JSON_PATH, jsonBeautify(tags, null, 2));
  console.info(successLogger('vetur-tags.json 생성'));
};
