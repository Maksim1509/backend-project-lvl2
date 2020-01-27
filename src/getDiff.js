import fs from 'fs';
import path from 'path';
import { has, union } from 'lodash';
import getParser from './parser';
import formatter from './formatters/index';


const getType = [
  {
    type: 'add',
    check: (key, beforeData, afterData) => !has(beforeData, key) && has(afterData, key),
    process: () => '',
  }, {
    type: 'remove',
    check: (key, beforeData, afterData) => has(beforeData, key) && !has(afterData, key),
    process: () => '',
  }, {
    type: 'unchanged',
    check: (key, beforeData, afterData) => beforeData[key] === afterData[key],
    process: () => '',
  }, {
    type: 'hasChildren',
    check: (key, beforeData, afterData) => typeof beforeData[key] === 'object' && typeof afterData[key] === 'object',
    process: (firstChild, secondChild, f) => f(firstChild, secondChild),
  }, {
    type: 'changed',
    check: (key, beforeData, afterData) => beforeData[key] !== afterData[key],
    process: () => '',
  },
];

const getTypeAction = (key, firstData, secondData) => getType.find(
  ({ check }) => check(key, firstData, secondData),
);

const getDifferenceAst = (firstData, secondData) => {
  const unaitedKeys = union(Object.keys(firstData), Object.keys(secondData));

  const difference = unaitedKeys.map((key) => {
    const { type, process } = getTypeAction(key, firstData, secondData);
    const oldValue = firstData[key];
    const newValue = secondData[key];
    const children = process(firstData[key], secondData[key], getDifferenceAst);
    const astNode = {
      type, key, children, oldValue, newValue,
    };
    return astNode;
  });
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
