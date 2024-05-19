export const calculateDiscount = (listedPrice, marketPrice) => {
  if (parseFloat(listedPrice) >= parseFloat(marketPrice)) {
    return null;
  }

  const discount =
    ((parseFloat(marketPrice) - parseFloat(listedPrice)) /
      parseFloat(marketPrice)) *
    100;

  return discount.toFixed(2);
};
