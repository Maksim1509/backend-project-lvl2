import fs from 'fs';
import PATH from 'path';
import getDiff from '../../src/bin/getDiff';

const formatJson = fs.readFileSync(PATH.join(__dirname, '../__fixtures__/format_json_expected.txt'), 'utf-8');
const plainJson = fs.readFileSync(PATH.join(__dirname, '../__fixtures__/format_plain_expected.txt'), 'utf-8');

const beforeJSON = PATH.join(__dirname, '../__fixtures__/before.json');
const afterJSON = PATH.join(__dirname, '../__fixtures__/after.json');

const beforeYAML = PATH.join(__dirname, '../__fixtures__/1.yaml');
const afterYAML = PATH.join(__dirname, '../__fixtures__/2.yaml');

const beforeINI = PATH.join(__dirname, '../__fixtures__/1.ini');
const afterINI = PATH.join(__dirname, '../__fixtures__/2.ini');

test('json', () => {
  const actual1 = getDiff(beforeJSON, afterJSON, 'json');
  expect(actual1).toEqual(formatJson);

  const actual2 = getDiff(beforeYAML, afterYAML, 'json');
  expect(actual2).toEqual(formatJson);

  const actual3 = getDiff(beforeINI, afterINI, 'json');
  expect(actual3).toEqual(formatJson);
});

test('plain', () => {
  const actual1 = getDiff(beforeJSON, afterJSON, 'plain');
  expect(actual1).toEqual(plainJson);

  const actual2 = getDiff(beforeYAML, afterYAML, 'plain');
  expect(actual2).toEqual(plainJson);

  const actual3 = getDiff(beforeINI, afterINI, 'plain');
  expect(actual3).toEqual(plainJson);
});
