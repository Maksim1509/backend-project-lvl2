import stylishFormating from './stylishFormatter';
import plainFormating from './plainFormatter';
import jsonFormating from './jsonFormatter';

const getFormatter = {
  plain: plainFormating,
  json: jsonFormating,
  stylish: stylishFormating,
};

export default (differenceAst, format) => getFormatter[format](differenceAst);
