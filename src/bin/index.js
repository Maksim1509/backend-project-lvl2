#!/usr/bin/env node
import commander from 'commander';
import { version as currentVersion } from '../../package.json';
import getDiff from '../getDiff';

const gendiff = new commander.Command();

gendiff
  .description('Compares two configuration files and shows a difference.')
  .version(currentVersion, '-v, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format', 'plain')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const diffirence = getDiff(firstConfig, secondConfig, gendiff.format);
    console.log(diffirence);
  });

gendiff.parse(process.argv);

export default getDiff;
