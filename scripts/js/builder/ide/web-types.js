const fs = require('fs');
const path = require('path');
const jsonBeautify = require('json-beautify');
const { successLogger } = require('../../utils/color-logger');
const ROOT_PATH = path.resolve(__dirname, '../../../../');
const PACKAGE_JSON_PATH = path.join(ROOT_PATH, '/package.json');
const WEB_TYPES_JSON_PATH = path.join(ROOT_PATH, '/ide/web-types.json');

module.exports = (componentInfos = []) => {
  const { version } = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
  const webTypesJson = {
    $schema: 'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
    framework: 'vue',
    name: 'yeogi-web-vue2-library',
    version,
    contributions: {
      html: {
        'types-syntax': 'typescript',
        'description-markup': 'markdown',
        tags: [],
      },
    },
  };
  const { tags } = webTypesJson.contributions.html;
  componentInfos.forEach((component) => {
    tags.push({
      name: component.componentName,
      source: {
        module: 'yeogi-web-vue2-library',
        symbol: component.componentName,
      },
      description: component.componentDescription,
      attributes: [
        ...component.props.map((prop) => {
          return {
            name: prop.name,
            value: {
              kind: 'expression',
              type: prop.type,
            },
            description: prop.description,
            /** 차후 작업
          default: '',
          'vue-model': {
            prop: 'show',
            event: 'input',
          },
          events: [
            {
              name: 'dismissed',
              'doc-url': 'https:/bootstrap-vue.org/docs/components/alert/',
              description:
                'Alert dismissed either via the dismiss close button or when the dismiss countdown has expired',
            },
            {
              name: 'dismiss-count-down',
              'doc-url': 'https:/bootstrap-vue.org/docs/components/alert/',
              description: 'When prop show is a number, this event emits every second on countdown.',
              arguments: [
                {
                  name: 'dismissCountDown',
                  'doc-url': 'https:/bootstrap-vue.org/docs/components/alert/',
                  description: 'Time remaining to dismissed',
                  type: 'number',
                },
              ],
            },
            {
              name: 'input',
              'doc-url': 'https:/bootstrap-vue.org/docs/components/alert/',
              description: 'Used to update the v-model show value',
              arguments: [
                {
                  name: 'show',
                  'doc-url': 'https:/bootstrap-vue.org/docs/components/alert/',
                  description: 'Boolean state of alert, or Number for current countdown value',
                  type: 'boolean|number',
                },
              ],
            },
          ],
          slots: [
            {
              name: 'dismiss',
              'doc-url': 'https:/bootstrap-vue.org/docs/components/alert/',
              description: 'Content for the dismiss button.',
            },
          ],
          **/
          };
        }),
      ],
    });
  });
  fs.writeFileSync(WEB_TYPES_JSON_PATH, jsonBeautify(webTypesJson, null, 2));
  console.info(successLogger('web-types.json 생성'));
};
