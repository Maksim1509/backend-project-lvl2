import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';


const TypeConversion = (value) => {
  if (!Number(value) && Number(value) !== 0) return value;
  if (typeof value === 'boolean') return value;
  return Number(value);
};

const iniParse = (data) => {
  const parsedData = ini.parse(data);

  const iter = (obj) => Object.keys(obj)
    .reduce((acc, key) => (_.isObject(obj[key])
      ? { ...acc, [key]: iter(obj[key]) }
      : { ...acc, [key]: TypeConversion(obj[key]) }), {});
  return iter(parsedData);
};

const selectParser = {
  yaml: yaml.safeLoad,
  json: JSON.parse,
  ini: iniParse,
};

export default (dataType) => selectParser[dataType];
