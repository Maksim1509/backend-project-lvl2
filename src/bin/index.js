#!/usr/bin/env node
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

const { format } = gendiff;


console.log(format);
