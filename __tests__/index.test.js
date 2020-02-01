import { readFileSync } from 'fs';
import path from 'path';
import getDiff from '../src';

const getPath = (fileName) => path.join(__dirname, '__fixtures__', fileName);

let formatDefaultExpected;
let formatJsonExpected;
let formatPlainExpected;
let firstData;
let secondData;
let actualDefault;
let actualJson;
let actualPlain;

beforeEach(() => {
  formatDefaultExpected = readFileSync(getPath('expected.txt'), 'utf-8');
  formatJsonExpected = readFileSync(getPath('format_json_expected.txt'), 'utf-8');
  formatPlainExpected = readFileSync(getPath('format_plain_expected.txt'), 'utf-8');
});

test('main tests', () => {
  firstData = getPath('before.json');
  secondData = getPath('after.json');
  actualDefault = getDiff(firstData, secondData);
  actualJson = getDiff(firstData, secondData, 'json');
  actualPlain = getDiff(firstData, secondData, 'plain');

  expect(actualDefault).toEqual(formatDefaultExpected);
  expect(actualJson).toEqual(formatJsonExpected);
  expect(actualPlain).toEqual(formatPlainExpected);

  firstData = getPath('1.yaml');
  secondData = getPath('2.yaml');
  actualDefault = getDiff(firstData, secondData);
  actualJson = getDiff(firstData, secondData, 'json');
  actualPlain = getDiff(firstData, secondData, 'plain');

  expect(actualDefault).toEqual(formatDefaultExpected);
  expect(actualJson).toEqual(formatJsonExpected);
  expect(actualPlain).toEqual(formatPlainExpected);

  firstData = getPath('1.ini');
  secondData = getPath('2.ini');
  actualDefault = getDiff(firstData, secondData);
  actualJson = getDiff(firstData, secondData, 'json');
  actualPlain = getDiff(firstData, secondData, 'plain');

  expect(actualDefault).toEqual(formatDefaultExpected);
  expect(actualJson).toEqual(formatJsonExpected);
  expect(actualPlain).toEqual(formatPlainExpected);
});
