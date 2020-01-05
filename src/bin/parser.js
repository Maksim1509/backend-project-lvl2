import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const mapped = {
  yaml: yaml.safeLoad,
  json: JSON.parse,
  ini: ini.parse,
};

export default (file) => mapped[path.extname(file).slice(1)];
