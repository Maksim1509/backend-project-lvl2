#!/usr/bin/env node
import commander from 'commander';
import { version as currentVersion } from '../../package.json';

const gendiff = new commander.Command();

gendiff.description('Compares two configuration files and shows a difference.');
gendiff.version(currentVersion, '-v, --version', 'output the version number');

gendiff.parse(process.argv);
