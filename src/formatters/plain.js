import _ from 'lodash';

const stringify = (value) => {
  if (typeof value === 'number' || typeof value === 'boolean') return value;
  return typeof value === 'object' ? '[complex value]' : `'${value}'`;
};

const buildKeyLine = (key, item) => {
  if (key === '') return item.key;
  return `${key}.${item.key}`;
};

const buildSting = {
  add: (keyLine, oldValue, newValue) => `Property '${keyLine}' was added whith value: ${stringify(newValue)}`,
  remove: (keyLine) => `Property '${keyLine}' was removed`,
  changed:
   (keyLine, oldValue, newValue) => (
     `Property '${keyLine}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`),
  unchanged: () => null,
  hasChildren: (keyLine, oldValue, newValue, children, f) => f(children, keyLine),
};

const render = (ast, key = '') => {
  const result = ast.map((item) => {
    const keyLine = buildKeyLine(key, item);
    const {
      type, children, oldValue, newValue,
    } = item;
    // if (type === 'hasChildren') return render(children, keyLine);
    return buildSting[type](keyLine, oldValue, newValue, children, render);
  });

  return _.flatten(result);
};

export default (ast, key) => render(ast, key).filter((a) => a).join('\n');
