const getLineIdent = (depth, LineIdent = '    ') => {
  if (depth === 1) return LineIdent;
  return getLineIdent(depth - 1, `    ${LineIdent}`);
};

const stringify = (value, depth) => {
  if (typeof value !== 'object') return value;

  const string = Object.keys(value).map((key) => {
    const currentValue = typeof value[key] === 'object' ? stringify(value[key]) : value[key];
    return `${getLineIdent(depth + 1)}${key}: ${currentValue}`;
  });
  return `{\n${string.join('\n')}\n${getLineIdent(depth)}}`;
};

const getString = {
  hasChildren: ({ key, children }, depth, f) => `${getLineIdent(depth)}${key}: ${f(children, depth + 1)}`,
  unchanged: ({ key, oldValue }, depth) => `${getLineIdent(depth)}${key}: ${stringify(oldValue, depth)}`,
  add: ({ key, newValue }, depth) => `${getLineIdent(depth, '  ')}+ ${key}: ${stringify(newValue, depth)}`,
  remove: ({ key, oldValue }, depth) => `${getLineIdent(depth, '  ')}- ${key}: ${stringify(oldValue, depth)}`,
  changed: ({ key, oldValue, newValue }, depth) => `${getLineIdent(depth, '  ')}- ${key}: ${stringify(oldValue, depth)}
${getLineIdent(depth, '  ')}+ ${key}: ${stringify(newValue, depth)}`,
};

const render = (ast) => {
  const iter = (obj, depth) => {
    const string = obj.map((item) => getString[item.type](item, depth, iter));
    return `{\n${string.join('\n')}\n${getLineIdent(depth, '')}}`;
  };
  return iter(ast, 1);
};

export default render;
