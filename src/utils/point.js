import dayjs from 'dayjs';

function humanizeFormatDate(date, format) {
  return dayjs(date).format(format);
}

function isFuturePoint(date) {
  return date && dayjs().isBefore(date, 'D');
}

function sortByDay(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}


export {humanizeFormatDate, isFuturePoint, sortByDay, sortByPrice};
