#!/usr/bin/env node
import { has } from 'lodash';
import commander from 'commander';
import { version as currentVersion } from '../../package.json';

const gendiff = new commander.Command();

gendiff
  .description('Compares two configuration files and shows a difference.')
  .version(currentVersion, '-v, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format', 'plain')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(firstConfig, secondConfig);
  });

gendiff.parse(process.argv);

const addPlusToKeys = (object) => {
  const entries = Object.entries(object);
  return entries.reduce((acc, [key, value]) => ({ ...acc, [`+${key}`]: value }), {});
};

const getDiff = (firstData, secondData) => {
  const keys = Object.keys(firstData);
  const difference = keys.reduce((acc, key) => {
    if (has(secondData, key)) {
      if (firstData[key] === secondData[key]) {
        return ({ ...acc, [key]: firstData[key] });
      }
      return ({ ...acc, [`-${key}`]: firstData[key], [`+${key}`]: secondData[key] });
    }
    return ({ ...acc, [`+${key}`]: firstData[key] });
  }, {});
  return ({ ...difference, ...addPlusToKeys(secondData) });
};

export default getDiff;
