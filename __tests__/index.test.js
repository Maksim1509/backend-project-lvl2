import { readFileSync } from 'fs';
import path from 'path';
import getDiff from '../src';

const getPath = (fileName) => {
  const pathToFixtures = path.join(__dirname, '/__fixtures__/');
  return `${pathToFixtures}${fileName}`;
};

let formatJsonExpected;
let formatPlainExpected;
let firstData;
let secondData;
let actualJson;
let actualPlain;

beforeEach(() => {
  formatJsonExpected = readFileSync(getPath('format_json_expected.txt'), 'utf-8');
  formatPlainExpected = readFileSync(getPath('format_plain_expected.txt'), 'utf-8');
});

test('main tests', () => {
  firstData = getPath('before.json');
  secondData = getPath('after.json');
  actualJson = getDiff(firstData, secondData, 'json');
  actualPlain = getDiff(firstData, secondData);

  expect(actualJson).toEqual(formatJsonExpected);
  expect(actualPlain).toEqual(formatPlainExpected);

  firstData = getPath('1.yaml');
  secondData = getPath('2.yaml');
  actualJson = getDiff(firstData, secondData, 'json');
  actualPlain = getDiff(firstData, secondData);

  expect(actualJson).toEqual(formatJsonExpected);
  expect(actualPlain).toEqual(formatPlainExpected);

  firstData = getPath('1.ini');
  secondData = getPath('2.yaml');
  actualJson = getDiff(firstData, secondData, 'json');
  actualPlain = getDiff(firstData, secondData);

  expect(actualJson).toEqual(formatJsonExpected);
  expect(actualPlain).toEqual(formatPlainExpected);
});
