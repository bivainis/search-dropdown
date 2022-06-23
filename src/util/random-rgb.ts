import randomFromZeroToN from './random-number';

const generateRandomRgbValueArray = () => {
  return Array.from('rgb', () => randomFromZeroToN(255));
};

export default generateRandomRgbValueArray;
