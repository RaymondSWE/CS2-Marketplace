import { calculateDiscount } from "../../utils/utils";

describe("utils", () => {
  describe("calculateDiscount", () => {
    it("calculates the correct discount percentage when listed price is lower than market price", () => {
      const listedPrice = "150";
      const marketPrice = "200";
      expect(calculateDiscount(listedPrice, marketPrice)).toBe("25.00");
    });

    it("returns null when listed price is higher than or equal to market price", () => {
      const listedPrice = "200";
      const marketPrice = "150";
      expect(calculateDiscount(listedPrice, marketPrice)).toBeNull();
    });
  });
});
