#!/usr/bin/env node
import fs from 'fs';
import { has } from 'lodash';
import commander from 'commander';
import { version as currentVersion } from '../../package.json';

const getDiff = (firstData, secondData) => {
  const keys = Object.keys(firstData);
  const differentKeys = Object.keys(secondData).filter((key) => !keys.includes(key));
  const totalKeys = keys.concat(differentKeys);
  const difference = totalKeys.reduce((acc, key) => {
    if (has(firstData, key) && has(secondData, key)) { // если ключ есть в обоих объектах
      if (firstData[key] === secondData[key]) { // проверям равны ли значения по этим ключам
        return ({ ...acc, [key]: firstData[key] });
      }
      return ({ ...acc, [`-${key}`]: firstData[key], [`+${key}`]: secondData[key] });
    }
    if (has(secondData, key)) {
      return ({ ...acc, [`+${key}`]: secondData[key] });
    }
    return ({ ...acc, [`-${key}`]: firstData[key] });
  }, {});
  return Object.entries(difference).map(([key, value]) => `${key}: ${value}`).join('\n');
};

const gendiff = new commander.Command();

gendiff
  .description('Compares two configuration files and shows a difference.')
  .version(currentVersion, '-v, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format', 'plain')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const firstFile = fs.readFileSync(firstConfig, 'utf8');
    const secondFile = fs.readFileSync(secondConfig, 'utf8');
    const diffirence = getDiff(JSON.parse(firstFile), JSON.parse(secondFile));
    console.log(diffirence);
  });

gendiff.parse(process.argv);

export default getDiff;
