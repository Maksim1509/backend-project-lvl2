const stringify = (value) => {
  if (typeof value === 'boolean') return value;
  if (Number(value) || Number(value) === 0) return Number(value);
  return value;
};

const data = {
  changed: (type, oldValue, newValue) => ({ type, oldValue, newValue }),
  add: (type, oldValue, newValue) => ({ type, value: newValue }),
  remove: (type, oldValue) => ({ type, value: oldValue }),
};

const render = (ast) => {
  const result = ast.reduce((acc, item) => {
    const {
      type, key, oldValue, newValue, children,
    } = item;
    if (type === 'unchanged') return acc;
    if (children) return { ...acc, [key]: render(children) };
    return { ...acc, [key]: data[type](type, oldValue, newValue) };
  }, {});
  return result;
};

export default (ast) => {
  const renderAst = render(ast);
  const formatJson = JSON.stringify(renderAst, (key, value) => stringify(value), 2);
  return formatJson;
};
