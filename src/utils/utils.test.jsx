import { calculateDiscount } from './utils.jsx';

describe('utils', () => {
  describe('calculateDiscount', () => {
    it('calculates the correct discount percentage', () => {
      const listedPrice = '200';
      const marketPrice = '150';
      expect(calculateDiscount(listedPrice, marketPrice)).toBe('33.33');
    });
  });
});
