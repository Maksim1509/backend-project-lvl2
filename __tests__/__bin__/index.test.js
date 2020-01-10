import fs from 'fs';
import PATH from 'path';
import getDiff from '../../src/bin/getDiff';

test('default', () => {
  const pathToFile1 = PATH.join(__dirname, '../__fixtures__/before.json');
  const pathToFile2 = PATH.join(__dirname, '../__fixtures__/after.json');

  const pathToFile3 = PATH.join(__dirname, '../__fixtures__/1.yaml');
  const pathToFile4 = PATH.join(__dirname, '../__fixtures__/2.yaml');

  const pathToFile5 = PATH.join(__dirname, '../__fixtures__/1.ini');
  const pathToFile6 = PATH.join(__dirname, '../__fixtures__/2.ini');

  // const pathToFile7 = PATH.join(__dirname, '../__fixtures__/1.json');
  // const pathToFile8 = PATH.join(__dirname, '../__fixtures__/2.json');

  // const expected = fs
  // .readFileSync(PATH.join(__dirname, '../__fixtures__/expected.txt'), 'utf-8');
  const formatPlain = fs.readFileSync(PATH.join(__dirname, '../__fixtures__/format_plain_expected.txt'), 'utf-8');

  const actual1 = getDiff(pathToFile1, pathToFile2);
  expect(actual1).toEqual(formatPlain);

  const actual2 = getDiff(pathToFile3, pathToFile4);
  expect(actual2).toEqual(formatPlain);

  const actual3 = getDiff(pathToFile5, pathToFile6);
  expect(actual3).toEqual(formatPlain);
});
