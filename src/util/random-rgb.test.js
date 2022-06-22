import generateRandomRgbColor from './random-rgb';

test('returns color array', () => {
  expect(generateRandomRgbColor()).toHaveLength(3);
});
