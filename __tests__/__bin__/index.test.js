import fs from 'fs';
import PATH from 'path';
import getDiff from '../../src/bin/getDiff';

test('default', () => {
  const pathToFile1 = PATH.join(__dirname, '../__fixtures__/before.json');
  const pathToFile2 = PATH.join(__dirname, '../__fixtures__/after.json');

  const expected = fs.readFileSync(PATH.join(__dirname, '../__fixtures__/expected.txt'), 'utf-8');

  const actual = getDiff(pathToFile1, pathToFile2);
  expect(actual).toEqual(expected);
});
