import dayjs from 'dayjs';

function humanizeFormatDate(date, format) {
  return dayjs(date).format(format);
}

function isFuturePoint(date) {
  return date && dayjs().isBefore(date, 'D');
}

export {humanizeFormatDate, isFuturePoint};
