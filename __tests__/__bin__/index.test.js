import gendiff from '../../src/bin';

test('default', () => {
  const pathToFile1 = './__tests__/__bin__/before.json';
  const pathToFile2 = './__tests__/__bin__/after.json';

  const expected = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

  const actual = gendiff(pathToFile1, pathToFile2);
  expect(actual).toEqual(expected);
});
