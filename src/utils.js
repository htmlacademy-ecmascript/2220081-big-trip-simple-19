import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:MM';
const TIME_FULL_FORMAT = 'DD/MM/YY HH MM';

const getRandomArrayElement = function(items) {
  return (items[Math.floor(Math.random() * items.length)]);
};

function humanizeTripDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function humanizeTripTime(dueDate) {
  return dueDate ? dayjs(dueDate).format(TIME_FORMAT) : '';
}

function humanizeTripTimeAndDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(TIME_FULL_FORMAT) : '';
}

export {getRandomArrayElement, humanizeTripDate, humanizeTripTime, humanizeTripTimeAndDate};
