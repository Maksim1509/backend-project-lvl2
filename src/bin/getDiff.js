import fs from 'fs';
import { has } from 'lodash';

export default (pathToFirstFile, pathToSecondFile) => {
  const firstData = JSON.parse(fs.readFileSync(pathToFirstFile, 'utf8'));
  const secondData = JSON.parse(fs.readFileSync(pathToSecondFile, 'utf8'));

  const keys = Object.keys(firstData);
  const differentKeys = Object.keys(secondData).filter((key) => !keys.includes(key));
  const totalKeys = keys.concat(differentKeys);
  const difference = totalKeys.reduce((acc, key) => {
    if (has(firstData, key) && has(secondData, key)) { // если ключ есть в обоих объектах
      if (firstData[key] === secondData[key]) { // проверям равны ли значения по этим ключам
        return ({ ...acc, [`  ${key}`]: firstData[key] });
      }
      return ({ ...acc, [`- ${key}`]: firstData[key], [`+ ${key}`]: secondData[key] });
    }
    if (has(secondData, key)) {
      return ({ ...acc, [`+ ${key}`]: secondData[key] });
    }
    return ({ ...acc, [`- ${key}`]: firstData[key] });
  }, {});
  const result = Object.entries(difference).map(([key, value]) => `  ${key}: ${value}`).join('\n');
  return `{
${result}
}`;
};
