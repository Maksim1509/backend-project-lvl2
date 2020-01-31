import defaultFormatter from './defaultFormatter';
import plainFormating from './plain';
import jsonFormating from './jsonFormatter';

const getFormatter = {
  plain: plainFormating,
  json: jsonFormating,
  default: defaultFormatter,
};

export default (differenceAst, format = 'default') => getFormatter[format](differenceAst);
