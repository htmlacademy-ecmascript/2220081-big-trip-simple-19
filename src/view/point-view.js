import AbstractView from '../framework/view/abstract-view.js';
import { humanizeFormatDate } from '../utils/common.js';
import { DATE_FORMAT, TIME_FORMAT } from '../const.js';

function createOffersTemplate(pointOffersIDs, offersData, pointType) {
  const offersByType = offersData.find(({type}) => type === pointType);
  if(pointOffersIDs.length === 0) {
    return `<li class="event__offer">
    <span class="event__offer-title">No additional offers</span>
    </li>`;
  }
  return pointOffersIDs.map((offerID) => {
    const offer = offersByType.offers.find(({id}) => id === offerID);
    return `<li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
    </li>`;
  }).join('');
}

function createPointTemplate(pointData, destinationsData, offersData) {
  const { basePrice, dateFrom, dateTo, destination: destinationId, offers, type } = pointData;
  const destination = destinationsData.find((dest) => destinationId === dest.id);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${humanizeFormatDate(dateFrom, DATE_FORMAT)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${humanizeFormatDate(dateFrom, TIME_FORMAT )}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${humanizeFormatDate(dateTo, TIME_FORMAT)}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${createOffersTemplate(offers, offersData, type)}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class TripPointView extends AbstractView {
  #handlePointToEdit = null;

  constructor({point, destinations, offersByType, onPointClick}) {
    super();
    this.point = point;
    this.destinations = destinations;
    this.offersByType = offersByType;
    this.#handlePointToEdit = onPointClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onPointToEditHandler);
  }


  get template() {
    return createPointTemplate(this.point, this.destinations, this.offersByType);
  }

  #onPointToEditHandler = (evt) => {
    evt.preventDefault();
    this.#handlePointToEdit();
  };
}
