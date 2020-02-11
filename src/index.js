import fs from 'fs';
import path from 'path';
import getDifferenceAst from './getDiff';
import getParse from './parser';
import render from './formatters';

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
