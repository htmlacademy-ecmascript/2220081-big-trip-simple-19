const getDestinationById = function(destinations, id) {
  return destinations.find((destination) => destination.id === id);
};

export { getDestinationById };
