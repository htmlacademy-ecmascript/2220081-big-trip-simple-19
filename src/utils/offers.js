const getTypeOffers = function(offersByType, type) {
  return offersByType.find((typeOffers) => typeOffers.type === type);
};

export { getTypeOffers };
