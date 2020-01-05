import path from 'path';
import yaml from 'js-yaml';

const mapped = {
  yaml: yaml.safeLoad,
  json: JSON.parse,
};

export default (file) => mapped[path.extname(file).slice(1)];
