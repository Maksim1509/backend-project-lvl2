import { readFileSync } from 'fs';
import PATH from 'path';
import getDiff from '../../src/bin/index';

const pathToFixtures = PATH.join(__dirname, '../__fixtures__/');

let formatJsonExpected;
let formatPlainExpected;
let firstData;
let secondData;
let actual;

beforeEach(() => {
  formatJsonExpected = readFileSync(`${pathToFixtures}format_json_expected.txt`, 'utf-8');
  formatPlainExpected = readFileSync(PATH.join(`${pathToFixtures}format_plain_expected.txt`), 'utf-8');
});

test('compare json', () => {
  firstData = `${pathToFixtures}before.json`;
  secondData = `${pathToFixtures}after.json`;
  actual = getDiff(firstData, secondData, 'json');
  expect(actual).toEqual(formatJsonExpected);

  firstData = `${pathToFixtures}1.yaml`;
  secondData = `${pathToFixtures}2.yaml`;
  actual = getDiff(firstData, secondData, 'json');
  expect(actual).toEqual(formatJsonExpected);

  firstData = `${pathToFixtures}1.ini`;
  secondData = `${pathToFixtures}2.ini`;
  actual = getDiff(firstData, secondData, 'json');
  expect(actual).toEqual(formatJsonExpected);
});

test('compare plain', () => {
  firstData = `${pathToFixtures}before.json`;
  secondData = `${pathToFixtures}after.json`;
  actual = getDiff(firstData, secondData);
  expect(actual).toEqual(formatPlainExpected);

  firstData = `${pathToFixtures}1.yaml`;
  secondData = `${pathToFixtures}2.yaml`;
  actual = getDiff(firstData, secondData);
  expect(actual).toEqual(formatPlainExpected);

  firstData = `${pathToFixtures}1.ini`;
  secondData = `${pathToFixtures}2.ini`;
  actual = getDiff(firstData, secondData);
  expect(actual).toEqual(formatPlainExpected);
});
