import { mockDestinations, mockOffersByType, mockPoints } from '../mock/mock.js';


export default class PointsModel {
  points = mockPoints;
  destinatioins = mockDestinations;
  offersByType = mockOffersByType;

  getPoints(){
    return this.points;
  }

  getDestinations(){
    return this.destinatioins;
  }

  getOffersByType(){
    return this.offersByType;
  }
}

