import { flatten } from 'lodash';

const stringify = (value) => {
  if (typeof value === 'number' || typeof value === 'boolean') return value;
  return typeof value === 'object' ? '[complex value]' : `'${value}'`;
};

const buildKeyLine = (key, item) => {
  if (key === '') return item.key;
  return `${key}.${item.key}`;
};

const buildSting = {
  add: (keyLine, { newValue }) => `Property '${keyLine}' was added whith value: ${stringify(newValue)}`,
  remove: (keyLine) => `Property '${keyLine}' was removed`,
  changed:
   (keyLine, { oldValue, newValue }) => (
     `Property '${keyLine}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`),
  unchanged: () => null,
  hasChildren: (keyLine, { children }, f) => f(children, keyLine),
};

const render = (ast, ancestry = '') => {
  const result = ast.map((item) => {
    const keyLine = buildKeyLine(ancestry, item);
    const processToBuildString = buildSting[item.type];
    return processToBuildString(keyLine, item, render);
  });
  return flatten(result);
};

export default (ast, ancestry) => render(ast, ancestry).filter((a) => a).join('\n');
