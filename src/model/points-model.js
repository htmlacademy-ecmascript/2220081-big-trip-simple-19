import { mockDestinations, mockOffersByType, mockPoints } from '../mock/mock.js';


export default class PointsModel {
  #points = mockPoints;
  #destinatioins = mockDestinations;
  #offersByType = mockOffersByType;

  get points(){
    return this.#points;
  }

  get destinations(){
    return this.#destinatioins;
  }

  get offersByType(){
    return this.#offersByType;
  }
}

