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

// const render = (ast) => {
//   const result = ast.reduce(
//     (acc, item) => ({ ...acc, [item.key]: data[item.type](item, render) }), {},
//   );
//   return result;
// };
const render = (ast) => {
  const parse = JSON.stringify(ast, null, 2).slice(1, -1);
  console.log(parse);
  const render2 = (data) => {
    data.map((item) => {
      if (item.type === 'hasChildren') return render2(item.children);
      return item;
    });
  };
  return render2(parse);
  // const result = ast.reduce(
  //   (acc, item) => {
  //     console.log(acc);
  //     if (item.type === 'hasChildren') return { ...acc, [item.key]: render(item.children) };
  //     return ({ ...acc, ...item });
  //   }, {},
  // );
  // return result;
};

export default (ast) => {
  const renderAst = render(ast);
  // const a = renderAst.map((node) => {
  //   if (node.type === 'hasChildren') return 
  // });
  console.log(a);
  // const formatJson = JSON.stringify(renderAst, (key, value) => stringify(value), 2);
  // return formatJson;
};


// https://github.com/Maksim1509/backend-project-lvl2/blob/master/src/formatters/jsonFormatter.js

// а зачем менять наше внутреннее дерево?

// Если его не менять у нас получается дерево