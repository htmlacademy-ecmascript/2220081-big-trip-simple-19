import dayjs from 'dayjs';


const getRandomArrayElement = function(items) {
  return (items[Math.floor(Math.random() * items.length)]);
};


function humanizeFormatDate(date, format) {
  return dayjs(date).format(format);
}

function getRandomArrayElements(arr) {
  return arr.filter(() => getRandomBoolean());
}

function getRandomBoolean() {
  return Math.random() > 0.5;
}

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const randomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


export {getRandomArrayElement, humanizeFormatDate , randomInt, getRandomArrayElements, getRandomBoolean};
