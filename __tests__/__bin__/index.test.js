import gendiff from '../../src/bin';

test('default', () => {
  const firstData = { time: 100, value: 1 };
  const secondData = { time: 200, value: 2 };
  const expected1 = {
    '-time': 100,
    '+time': 200,
    '-value': 1,
    '+value': 2,
  };

  const firstDataVersion1 = { time: 100, value: 1, otherValue: 3 };
  const expected2 = {
    '-otherValue': 3,
    '-time': 100,
    '+time': 200,
    '-value': 1,
    '+value': 2,
  };

  const secondDataVersion1 = { time: 100, value: 2, otherValue: 350 };
  const expected3 = {
    '+otherValue': 350,
    time: 100,
    '-value': 1,
    '+value': 2,
  };

  const actual1 = gendiff(firstData, secondData);
  expect(actual1).toEqual(expected1);
  const actual2 = gendiff(firstDataVersion1, secondData);
  expect(actual2).toEqual(expected2);
  const actual3 = gendiff(firstData, secondDataVersion1);
  expect(actual3).toEqual(expected3);
});
