import fs from 'fs';
import PATH from 'path';
import getDiff from '../../src/bin/getDiff';


describe('json format', () => {
  test('json', () => {
    const pathToFile1 = PATH.join(__dirname, '../__fixtures__/before.json');
    const pathToFile2 = PATH.join(__dirname, '../__fixtures__/after.json');

    const formatJson = fs.readFileSync(PATH.join(__dirname, '../__fixtures__/format_json_expected.txt'), 'utf-8');

    const actual = getDiff(pathToFile1, pathToFile2, 'json');
    expect(actual).toEqual(formatJson);
  });

  test('yaml', () => {
    const pathToFile1 = PATH.join(__dirname, '../__fixtures__/1.yaml');
    const pathToFile2 = PATH.join(__dirname, '../__fixtures__/2.yaml');

    const formatJson = fs.readFileSync(PATH.join(__dirname, '../__fixtures__/format_json_expected.txt'), 'utf-8');

    const actual = getDiff(pathToFile1, pathToFile2, 'json');
    expect(actual).toEqual(formatJson);
  });

  test('ini', () => {
    const pathToFile1 = PATH.join(__dirname, '../__fixtures__/1.ini');
    const pathToFile2 = PATH.join(__dirname, '../__fixtures__/2.ini');

    const formatJson = fs.readFileSync(PATH.join(__dirname, '../__fixtures__/format_json_expected.txt'), 'utf-8');

    const actual = getDiff(pathToFile1, pathToFile2, 'json');
    expect(actual).toEqual(formatJson);
  });
});

describe('plain format', () => {
  test('json', () => {
    const pathToFile1 = PATH.join(__dirname, '../__fixtures__/before.json');
    const pathToFile2 = PATH.join(__dirname, '../__fixtures__/after.json');

    const plainJson = fs.readFileSync(PATH.join(__dirname, '../__fixtures__/format_plain_expected.txt'), 'utf-8');

    const actual = getDiff(pathToFile1, pathToFile2, 'plain');
    expect(actual).toEqual(plainJson);
  });

  test('yaml', () => {
    const pathToFile1 = PATH.join(__dirname, '../__fixtures__/1.yaml');
    const pathToFile2 = PATH.join(__dirname, '../__fixtures__/2.yaml');

    const plainJson = fs.readFileSync(PATH.join(__dirname, '../__fixtures__/format_plain_expected.txt'), 'utf-8');

    const actual = getDiff(pathToFile1, pathToFile2, 'plain');
    expect(actual).toEqual(plainJson);
  });

  test('ini', () => {
    const pathToFile1 = PATH.join(__dirname, '../__fixtures__/1.ini');
    const pathToFile2 = PATH.join(__dirname, '../__fixtures__/2.ini');

    const plainJson = fs.readFileSync(PATH.join(__dirname, '../__fixtures__/format_plain_expected.txt'), 'utf-8');

    const actual = getDiff(pathToFile1, pathToFile2, 'plain');
    expect(actual).toEqual(plainJson);
  });
});
