import dayjs from 'dayjs';

function humanizeFormatDate(date, format) {
  return dayjs(date).format(format);
}

export {humanizeFormatDate};
