import getDiff from '../../src/bin/getDiff';

test('default', () => {
  const pathToFile1 = './__tests__/__fixtures__/before.json';
  const pathToFile2 = './__tests__/__fixtures__/after.json';

  const expected = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

  const actual = getDiff(pathToFile1, pathToFile2);
  expect(actual).toEqual(expected);
});