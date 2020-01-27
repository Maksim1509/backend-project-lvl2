const stringify = (value) => {
  if (typeof value === 'boolean') return value;
  if (Number(value) || Number(value) === 0) return Number(value);
  return value;
};

const data = {
  changed: ({ type, oldValue, newValue }) => ({ type, oldValue, newValue }),
  add: ({ type, newValue }) => ({ type, value: newValue }),
  remove: ({ type, oldValue }) => ({ type, value: oldValue }),
  hasChildren: ({ children }, f) => f(children),
  unchanged: ({ type, oldValue }) => ({ type, value: oldValue }),
};

const render = (ast) => {
  const result = ast.reduce(
    (acc, item) => ({ ...acc, [item.key]: data[item.type](item, render) }), {},
  );
  return result;
};

export default (ast) => {
  const renderAst = render(ast);
  const formatJson = JSON.stringify(renderAst, (key, value) => stringify(value), 2);
  return formatJson;
};
