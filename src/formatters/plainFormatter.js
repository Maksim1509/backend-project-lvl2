import { flatten } from 'lodash';

const stringify = (value) => {
  if (typeof value === 'number' || typeof value === 'boolean') return value;
  return typeof value === 'object' ? '[complex value]' : `'${value}'`;
};

const getAncestry = (ancestry, item) => {
  if (ancestry === '') return item.key;
  return `${ancestry}.${item.key}`;
};

const buildSting = {
  add: (currentAncestry, { newValue }) => `Property '${currentAncestry}' was added whith value: ${stringify(newValue)}`,
  remove: (currentAncestry) => `Property '${currentAncestry}' was removed`,
  changed:
   (currentAncestry, { oldValue, newValue }) => (
     `Property '${currentAncestry}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`),
  unchanged: () => null,
  hasChildren: (currentAncestry, { children }, f) => f(children, currentAncestry),
};

const render = (ast, ancestry = '') => {
  const result = ast.map((item) => {
    const currentAncestry = getAncestry(ancestry, item);
    const processToBuildString = buildSting[item.type];
    return processToBuildString(currentAncestry, item, render);
  });
  return flatten(result);
};

export default (ast, ancestry) => render(ast, ancestry).filter((a) => a).join('\n');
