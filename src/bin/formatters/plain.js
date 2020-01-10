const stringify = (value) => {
  if (typeof value === 'number' || typeof value === 'boolean') return value;
  return typeof value === 'object' ? '[complex value]' : `'${value}'`;
};

const buildKeyLine = (key, item) => {
  if (key === '') return item.key;
  return `${key}.${item.key}`;
};

const render = (ast, key) => {
  const res = ast.reduce((acc, item) => {
    const keyLIne = buildKeyLine(key, item);
    const {
      type, children, oldValue, newValue,
    } = item;
    let string;
    if (children) string = render(children, keyLIne);
    else if (type === 'add') string = `Property '${keyLIne}' was added whith value: ${stringify(newValue)}`;
    else if (type === 'remove') string = `Property '${keyLIne}' was removed`;
    else if (type === 'changed') {
      string = `Property '${keyLIne}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
    }
    return acc.concat(string);
  }, []);
  return res.filter((a) => a).join('\n');
};

export default render;
