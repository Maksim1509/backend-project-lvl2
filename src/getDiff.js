import fs from 'fs';
import { has, union } from 'lodash';
import parser from './parser';
import plainFormating from './formatters/plain';
import jsonFormating from './formatters/jsonFormatter';

const getType = [{
  type: 'add',
  check: (key, beforeData, afterData) => !has(beforeData, key) && has(afterData, key),
}, {
  type: 'remove',
  check: (key, beforeData, afterData) => has(beforeData, key) && !has(afterData, key),
}, {
  type: 'unchanged',
  check: (key, beforeData, afterData) => beforeData[key] === afterData[key],
}, {
  type: 'changed',
  check: (key, beforeData, afterData) => beforeData[key] !== afterData[key],
}];

const getFormatter = {
  plain: plainFormating,
  json: jsonFormating,
};

const getDifferenceAst = (firstData, secondData) => {
  const unaitedKeys = union(Object.keys(firstData), Object.keys(secondData));

  const difference = unaitedKeys.reduce((acc, key) => {
    const { type } = getType.find(({ check }) => check(key, firstData, secondData));
    const children = typeof firstData[key] === 'object' && typeof secondData[key] === 'object'
      ? getDifferenceAst(firstData[key], secondData[key]) : '';
    return [...acc, {
      type, key, children, oldValue: firstData[key], newValue: secondData[key],
    }];
  }, []);
  return difference;
};

export default (pathToFirstFile, pathToSecondFile, format = 'plain') => {
  const firstFile = fs.readFileSync(pathToFirstFile, 'utf8');
  const secondFile = fs.readFileSync(pathToSecondFile, 'utf-8');

  const firstParser = parser(pathToFirstFile);
  const secondParser = parser(pathToSecondFile);

  const firstData = firstParser(firstFile);
  const secondData = secondParser(secondFile);

  const difference = getDifferenceAst(firstData, secondData);
  const formatter = getFormatter[format];
  return formatter(difference, '');
};
