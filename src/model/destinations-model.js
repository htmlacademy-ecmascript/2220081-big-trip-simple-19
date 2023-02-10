import { mockDestinations } from '../mock/mock.js';


export default class DestinationsModel {
  #destinatioins = mockDestinations;

  get destinations(){
    return this.#destinatioins;
  }
}

