import { mockPoints } from '../mock/mock.js';


export default class PointsModel {
  #points = mockPoints;

  get points(){
    return this.#points;
  }
}

