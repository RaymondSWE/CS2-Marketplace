export const calculateDiscount = (listedPrice, marketPrice) => {
    const discount =
      ((parseFloat(listedPrice) - parseFloat(marketPrice)) /
        parseFloat(marketPrice)) *
      100;
    return discount.toFixed(2);
  };
  