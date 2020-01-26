import fs from 'fs';
import path from 'path';
import { has, union } from 'lodash';
import getParser from './parser';
import formatter from './formatters/index';


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
  const firstData = fs.readFileSync(pathToFirstFile, 'utf8');
  const secondData = fs.readFileSync(pathToSecondFile, 'utf-8');

  const firstDataType = path.extname(pathToFirstFile).slice(1);
  const secondDataType = path.extname(pathToSecondFile).slice(1);

  const firstParseredData = getParser(firstDataType)(firstData);
  const secondParseredData = getParser(secondDataType)(secondData);

  const differenceAst = getDifferenceAst(firstParseredData, secondParseredData);

  return formatter(differenceAst, format);
};
