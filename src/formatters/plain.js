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
};

const render = (ast, key = '') => {
  const result = ast.reduce((acc, item) => {
    const keyLine = buildKeyLine(key, item);
    const {
      type, children, oldValue, newValue,
    } = item;

    if (children) return acc.concat(render(children, keyLine));

    const newAcc = buildSting[type](keyLine, oldValue, newValue);
    return acc.concat(newAcc);
  }, []);
  return result;
};

export default (ast, key) => render(ast, key).filter((a) => a).join('\n');
