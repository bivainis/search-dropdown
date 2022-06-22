import randomFromZeroToN from './random-number';

const generateRandomRgbColor = () => {
  return Array.from('rgb', () => randomFromZeroToN(255));
};

export default generateRandomRgbColor;
