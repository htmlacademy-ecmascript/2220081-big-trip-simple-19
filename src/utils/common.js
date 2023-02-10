const getRandomArrayElement = function(items) {
  return (items[Math.floor(Math.random() * items.length)]);
};

function getRandomArrayElements(arr) {
  return arr.filter(() => getRandomBoolean());
}

function getRandomBoolean() {
  return Math.random() > 0.5;
}

function isEscape(evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const randomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}


export {getRandomArrayElement, randomInt, getRandomArrayElements, getRandomBoolean, isEscape, updateItem};
