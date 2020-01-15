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

test('main tests', () => {
  const actualJSON1 = getDiff(beforeJSON, afterJSON, 'json');
  expect(actualJSON1).toEqual(formatJson);

  const actualJSON2 = getDiff(beforeYAML, afterYAML, 'json');
  expect(actualJSON2).toEqual(formatJson);

  const actualJSON3 = getDiff(beforeINI, afterINI, 'json');
  expect(actualJSON3).toEqual(formatJson);

  const actualPlain1 = getDiff(beforeJSON, afterJSON, 'plain');
  expect(actualPlain1).toEqual(plainJson);

  const actualPlain2 = getDiff(beforeYAML, afterYAML, 'plain');
  expect(actualPlain2).toEqual(plainJson);

  const actualPlain3 = getDiff(beforeINI, afterINI, 'plain');
  expect(actualPlain3).toEqual(plainJson);
});
