import _ from 'lodash';

const getLineIdent = (depth) => {
  const lineIdent = ' '.repeat(4);
  const newLineIdent = lineIdent.repeat(depth);
  return newLineIdent;
};

const stringify = (value, depth) => {
  if (typeof value !== 'object') return value;

  const string = Object.keys(value).map((key) => {
    const currentValue = _.isObject(value[key]) ? stringify(value[key]) : value[key];
    return `${getLineIdent(depth + 1)}${key}: ${currentValue}`;
  });
  return `{\n${string.join('\n')}\n${getLineIdent(depth)}}`;
};

const getString = {
  hasChildren: ({ key, children }, depth, f) => `${getLineIdent(depth)}${key}: ${f(children, depth + 1)}`,
  unchanged: ({ key, oldValue }, depth) => `${getLineIdent(depth)}${key}: ${stringify(oldValue, depth)}`,
  add: ({ key, newValue }, depth) => `${getLineIdent(depth).slice(2)}+ ${key}: ${stringify(newValue, depth)}`,
  remove: ({ key, oldValue }, depth) => `${getLineIdent(depth).slice(2)}- ${key}: ${stringify(oldValue, depth)}`,
  changed: ({ key, oldValue, newValue }, depth) => `${getLineIdent(depth).slice(2)}- ${key}: ${stringify(oldValue, depth)}
${getLineIdent(depth).slice(2)}+ ${key}: ${stringify(newValue, depth)}`,
};

const render = (ast) => {
  const iter = (obj, depth) => {
    const string = obj.map((item) => getString[item.type](item, depth, iter));
    return `{\n${string.join('\n')}\n${getLineIdent(depth).slice(4)}}`;
  };
  return iter(ast, 1);
};

export default render;
