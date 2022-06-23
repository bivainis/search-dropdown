import generateRandomRgbValueArray from './random-rgb';

test('returns color array', () => {
  expect(generateRandomRgbValueArray()).toHaveLength(3);
});
