const fs = require('fs');
const cheerio = require('cheerio');
const ts = require('typescript');
const { error, warn } = require('./color-logger');

/*************** util functions ****************/
// ex) @Prop({ type: String }) => Prop
function getDecoratorIdentifier(decorator) {
  return decorator.expression.expression.escapedText;
}

// ex1) @Prop({ type: String }, someVar) => { type: string }
// ex2) @Prop(someVar, { type: String }) => someVar
function getDecoratorFirstArgumentObject(decorator) {
  return decorator.expression.arguments[0];
}

// ex) @Prop({ someKey: String }) => someKey
function getPropertyName(obj) {
  return obj.name.escapedText;
}

// 단순 오브젝트가 아니라 typescript에서 이용하는 Node Object
function findPropertyByPropertyNameInProperties(properties = [], key) {
  return properties.find((prop) => getPropertyName(prop) === key);
}

function getDeepValueInProperty(property = {}, keys = ['__none__']) {
  let deepValue = property;
  const find = keys.every((key) => {
    deepValue = deepValue[key];
    return deepValue;
  });
  return find ? deepValue : undefined;
}

// ex) @Prop({ someKey: 'someValue' }) => 'someValue'
function getPropertyValue(property) {
  return getDeepValueInProperty(property, ['initializer', 'text']);
}

const parseVueSource = (filePath) => {
  const fileString = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(fileString);
  const source = $('script').html();
  const node = ts.createSourceFile('created-source.ts', source, ts.ScriptTarget.Latest);
  let componentName = null;
  let componentDescription = null;
  const props = [];
  const emits = [];
  let classDecl = null;

  /************** parse class **************/
  /*
    export default class 를 찾음
  */
  node.forEachChild((child) => {
    if (ts.SyntaxKind[child.kind] === 'ClassDeclaration') {
      classDecl = child;
    }
  });
  /*
    @Component 파싱 작업
  */
  componentName = getPropertyName(classDecl);
  classDecl.decorators.forEach((decorator) => {
    if (getDecoratorIdentifier(decorator) !== 'IdeComponent') {
      return;
    }
    const { properties } = getDecoratorFirstArgumentObject(decorator);
    const descriptionProperty = findPropertyByPropertyNameInProperties(properties, 'description');
    componentDescription = getPropertyValue(descriptionProperty);
  });

  /************** parse member **************/
  /*
    @Prop 파싱 작업
  */
  classDecl.members.forEach((member) => {
    const name = getPropertyName(member);
    const { decorators } = member;
    // decorator가 없다면, 패스
    if (!decorators) {
      return;
    }

    const propDecorators = decorators.reduce((acc, decorator) => {
      const identifier = getDecoratorIdentifier(decorator);
      if (['Prop', 'IdeProp', 'IdeEmit'].includes(identifier)) {
        acc[identifier] = decorator;
      }
      return acc;
    }, {});

    if (!propDecorators['Prop']) {
      // Prop 없는 컴포넌트
      return;
    }

    if (propDecorators['Prop'] && !propDecorators['IdeProp']) {
      console.info(warn(`${componentName} 컴포넌트 @IdeProp({ type: string, description?: string }) 누락!`));
      props.push({
        name,
        type: '누락 됨',
        description: '누락 됨',
      });
      return;
    }

    const { properties } = getDecoratorFirstArgumentObject(propDecorators['IdeProp']);
    const typeProperty = findPropertyByPropertyNameInProperties(properties, 'type');
    const descriptionProperty = findPropertyByPropertyNameInProperties(properties, 'description');
    const type = getPropertyValue(typeProperty);
    const description = getPropertyValue(descriptionProperty);

    if (!type) {
      console.info(error(`${componentName} 컴포넌트 IdeDecorator의 type`));
    }

    props.push({
      name,
      type,
      description: [
        `{ type: ${type} }`,
        ...(description
          ? description
              .split('\n')
              .map((line) => line.trim())
              .filter((line) => line)
          : ''),
      ].join('  \n'), // 공백 두칸은 vscode vetur 개행 안되는 버그 처리
    });
  });

  return {
    componentName,
    componentDescription: componentDescription || '설명 없음',
    props,
    emits,
  };
};

/*************** util functions end ****************/
module.exports = (filePathes) => filePathes.map(parseVueSource);
