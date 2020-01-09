import fs from 'fs';
import { has } from 'lodash';
import parser from './parser';

const mapped = (key, beforeData, afterData) => {
  switch (true) {
    case (has(beforeData, key) && has(afterData, key)):
      if (typeof beforeData[key] === 'object' && typeof afterData[key] === 'object') return 'unchanged';
      return (beforeData[key] === afterData[key]) ? 'unchanged' : 'changed';
    case has(afterData, key): return 'add';
    default: return 'remove';
  }
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

const stringify = (value, spaces) => {
  const newSpaces = `${spaces}    `;
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    const string = keys.reduce((acc, key) => {
      const currentValue = typeof value[key] === 'object' ? stringify(value[key]) : value[key];
      return [...acc, `${newSpaces}${key}: ${currentValue}`];
    }, []);
    return `{\n${string.join('\n')}\n${spaces}}`;
  }
  return value;
};

const getSpaces = (countSpaces) => {
  let spaces = '';
  for (let i = 0; i < countSpaces; i += 1) {
    spaces += ' ';
  }
  return spaces;
};

const render = (ast, spaces) => {
  const spaceLine = getSpaces(spaces);
  const shortSpaceLine = spaceLine.slice(2);
  const res = ast.reduce((acc, item) => {
    const {
      type, children, oldValue, newValue,
    } = item;
    let string;
    if (children instanceof Array) string = `${spaceLine}${item.key}: ${render(children, spaceLine.length + 4)}`;
    else if (type === 'unchanged') string = `${spaceLine}${item.key}: ${stringify(oldValue, spaceLine)}`;
    else if (type === 'add') string = `${shortSpaceLine}+ ${item.key}: ${stringify(newValue, spaceLine)}`;
    else if (type === 'remove') string = `${shortSpaceLine}- ${item.key}: ${stringify(oldValue, spaceLine)}`;
    else if (type === 'changed') {
      string = `${shortSpaceLine}- ${item.key}: ${stringify(oldValue, spaceLine)}\n${shortSpaceLine}+ ${item.key}: ${stringify(newValue, spaceLine)}`;
    }
    return [...acc, string];
  }, []);
  return `{\n${res.join('\n')}\n${spaceLine.slice(4)}}`;
};

export default (pathToFirstFile, pathToSecondFile) => {
  const firstFile = fs.readFileSync(pathToFirstFile, 'utf8');
  const secondFile = fs.readFileSync(pathToSecondFile, 'utf-8');

  const firstParser = parser(pathToFirstFile);
  const secondParser = parser(pathToSecondFile);

  const firstData = firstParser(firstFile);
  const secondData = secondParser(secondFile);

  const difference = getDifferenceAst(firstData, secondData);

  return render(difference, 4);
};
