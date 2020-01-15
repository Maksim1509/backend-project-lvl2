const stringify = (value) => {
  if (typeof value === 'number' || typeof value === 'boolean') return value;
  return typeof value === 'object' ? '[complex value]' : `'${value}'`;
};

const buildKeyLine = (key, item) => {
  if (key === '') return item.key;
  return `${key}.${item.key}`;
};

const buildSting = {
  add: (keyLIne, oldValue, newValue) => `Property '${keyLIne}' was added whith value: ${stringify(newValue)}`,
  remove: (keyLIne) => `Property '${keyLIne}' was removed`,
  changed:
   (keyLIne, oldValue, newValue) => (
     `Property '${keyLIne}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`),
  unchanged: () => null,
};

const render = (ast, key) => {
  const result = ast.reduce((acc, item) => {
    const keyLIne = buildKeyLine(key, item);
    const {
      type, children, oldValue, newValue,
    } = item;

    if (children) return acc.concat(render(children, keyLIne));

    const newAcc = buildSting[type](keyLIne, oldValue, newValue);
    return acc.concat(newAcc);
  }, []);
  return result;
};

export default (ast, key) => render(ast, key).filter((a) => a).join('\n');
