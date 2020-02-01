const stringify = (value, spaces) => {
  const newSpaces = `${spaces}    `;
  if (typeof value === 'object') {
    const string = Object.keys(value).map((key) => {
      const currentValue = typeof value[key] === 'object' ? stringify(value[key]) : value[key];
      return `${newSpaces}${key}: ${currentValue}`;
    });
    return `{\n${string.join('\n')}\n${spaces}}`;
  }
  return value;
};

const buildString = (key, value, spaces, sign, func) => `${spaces.slice(2)}${sign} ${key}: ${func(value, spaces)}`;

const getString = {
  hasChildren: ({ key, children }, spaсeLine, f) => `${spaсeLine}${key}: ${f(children, spaсeLine)}`,
  unchanged: ({ key, oldValue }, spaceLine) => `${spaceLine}${key}: ${stringify(oldValue, spaceLine)}`,
  add: ({ key, newValue }, spaceLine) => buildString(key, newValue, spaceLine, '+', stringify),
  remove: ({ key, oldValue }, spaceLine) => buildString(key, oldValue, spaceLine, '-', stringify),
  changed: ({ key, oldValue, newValue }, spaceLine) => `${spaceLine.slice(2)}- ${key}: ${stringify(oldValue, spaceLine)}
${spaceLine.slice(2)}+ ${key}: ${stringify(newValue, spaceLine)}`,
};

const render = (ast, spaces = '') => {
  const spaceLine = `${spaces}    `;
  const result = ast.map((item) => {
    const string = getString[item.type](item, spaceLine, render);
    return string;
  });
  return `{\n${result.join('\n')}\n${spaceLine.slice(4)}}`;
};

export default render;
