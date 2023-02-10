import { mockOffersByType } from '../mock/mock.js';


export default class OffersModel {
  #offers = mockOffersByType;

  get offers(){
    return this.#offers;
  }
}

