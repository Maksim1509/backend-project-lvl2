import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const selectParser = {
  yaml: yaml.safeLoad,
  json: JSON.parse,
  ini: ini.parse,
};

export default (file) => selectParser[path.extname(file).slice(1)];
