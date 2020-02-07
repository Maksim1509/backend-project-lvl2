import { readFileSync } from 'fs';
import path from 'path';
import getDiff from '../src';

const getPath = (fileName) => path.join(__dirname, '__fixtures__', fileName);
let expected;

beforeEach(() => {
  expected = {
    stylish: readFileSync(getPath('expected.txt'), 'utf-8'),
    json: readFileSync(getPath('format_json_expected.txt'), 'utf-8'),
    plain: readFileSync(getPath('format_plain_expected.txt'), 'utf-8'),
  };
});

const types = ['json', 'yaml', 'ini'];
const formatters = ['stylish', 'plain', 'json'];
const dataForTests = types.map((type) => formatters.map((format) => [type, format])).flat();

test.each(dataForTests)('getDiff type: %s, format: %s', (type, format) => {
  const beforData = getPath(`before.${type}`);
  const afterData = getPath(`after.${type}`);
  const actual = getDiff(beforData, afterData, format);
  expect(actual).toEqual(expected[format]);
});
