import { FilterType } from '../const.js';
import { isFuturePoint } from './point.js';

const filter = {
  [FilterType.ALL]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point.dateFrom)),
};

export {filter};
