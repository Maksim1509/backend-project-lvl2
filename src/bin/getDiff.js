import fs from 'fs';
import { has } from 'lodash';
import parser from './parser';
import plainFormating from './formatters/plain';

const mapped = (key, beforeData, afterData) => {
  switch (true) {
    case (has(beforeData, key) && has(afterData, key)):
      if (typeof beforeData[key] === 'object' && typeof afterData[key] === 'object') return 'unchanged';
      return (beforeData[key] === afterData[key]) ? 'unchanged' : 'changed';
    case has(afterData, key): return 'add';
    default: return 'remove';
  }
};

const getFormatter = {
  plain: plainFormating,
};

const getDifferenceAst = (firstData, secondData) => {
  const keys = Object.keys(firstData);
  const differentKeys = Object.keys(secondData).filter((key) => !keys.includes(key));
  const totalKeys = keys.concat(differentKeys);

  const difference = totalKeys.reduce((acc, key) => {
    const type = mapped(key, firstData, secondData);
    return [...acc, {
      type,
      key,
      children: typeof firstData[key] === 'object' && typeof secondData[key] === 'object'
        ? getDifferenceAst(firstData[key], secondData[key]) : '',
      oldValue: firstData[key],
      newValue: secondData[key],
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
