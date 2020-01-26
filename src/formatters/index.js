import plainFormating from './plain';
import jsonFormating from './jsonFormatter';

const getFormatter = {
  plain: plainFormating,
  json: jsonFormating,
};

export default (differenceAst, format) => getFormatter[format](differenceAst);
