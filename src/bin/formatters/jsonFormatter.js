const stringify = (value) => {
  if (typeof value === 'boolean') return value;
  if (Number(value) || Number(value) === 0) return Number(value);
  return value;
};

const render = (ast) => {
  const result = ast.reduce((acc, item) => {
    const { type, key, oldValue } = item;
    let newAcc;
    if (type === 'changed') {
      newAcc = { ...acc, [key]: { type, oldValue, newValue: item.newValue } };
    }
    if (type === 'add') {
      newAcc = { ...acc, [key]: { type, value: item.newValue } };
    }
    if (type === 'remove') {
      newAcc = { ...acc, [key]: { type, value: oldValue } };
    }
    if (item.children) {
      newAcc = { ...acc, [key]: render(item.children) };
    }
    return newAcc;
  }, {});
  return result;
};

export default (ast) => {
  const renderAst = render(ast);
  const formatJson = JSON.stringify(renderAst, (key, value) => stringify(value), 2);
  return formatJson;
};
