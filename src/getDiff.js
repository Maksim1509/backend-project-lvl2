import fs from 'fs';
import path from 'path';
import { has, union } from 'lodash';
import getParse from './parser';
import render from './formatters/index';

const getType = [
  {
    type: 'add',
    check: (key, firstData, secondData) => !has(firstData, key) && has(secondData, key),
    getNode: ({ type, key, secondData }) => ({ type, key, newValue: secondData[key] }),
  }, {
    type: 'remove',
    check: (key, firstData, secondData) => has(firstData, key) && !has(secondData, key),
    getNode: ({ type, key, firstData }) => ({ type, key, oldValue: firstData[key] }),
  }, {
    type: 'unchanged',
    check: (key, firstData, secondData) => firstData[key] === secondData[key],
    getNode: ({ type, key, firstData }) => ({ type, key, oldValue: firstData[key] }),
  }, {
    type: 'hasChildren',
    check: (key, firstData, secondData) => typeof firstData[key] === 'object' && typeof secondData[key] === 'object',
    getNode: ({
      type, key, firstData, secondData, getDifferenceAst,
    }) => ({ type, key, children: getDifferenceAst(firstData[key], secondData[key]) }),
  }, {
    type: 'changed',
    check: (key, firstData, secondData) => firstData[key] !== secondData[key],
    getNode: ({
      type, key, firstData, secondData,
    }) => ({
      type, key, oldValue: firstData[key], newValue: secondData[key],
    }),
  },
];

const getTypeAction = (key, firstData, secondData) => getType.find(
  ({ check }) => check(key, firstData, secondData),
);

const getDifferenceAst = (firstData, secondData) => {
  const unaitedKeys = union(Object.keys(firstData), Object.keys(secondData));

  const difference = unaitedKeys.map((key) => {
    const { type, getNode } = getTypeAction(key, firstData, secondData);
    const astNode = getNode({
      type, key, firstData, secondData, getDifferenceAst,
    });
    return astNode;
  });
  return difference;
};

export default (pathToFirstFile, pathToSecondFile, format = 'stylish') => {
  const firstData = fs.readFileSync(pathToFirstFile, 'utf8');
  const secondData = fs.readFileSync(pathToSecondFile, 'utf-8');

  const firstDataType = path.extname(pathToFirstFile).slice(1);
  const secondDataType = path.extname(pathToSecondFile).slice(1);

  const firstParseredData = getParse(firstDataType)(firstData);
  const secondParseredData = getParse(secondDataType)(secondData);

  const differenceAst = getDifferenceAst(firstParseredData, secondParseredData);
  return render(differenceAst, format);
};
