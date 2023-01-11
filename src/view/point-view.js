import { mockDestination } from '../mock/mock.js';
import { mockOffers } from '../mock/mock.js';
import { createElement } from '../render.js';
import { humanizeTripDate, humanizeTripTime} from '../utils.js';

function createDestinationNameTemplate (currentDestinations) {
  return mockDestination.map((mockDestinations) => currentDestinations === mockDestinations.id ? mockDestinations.name : '').join('');
}

function createOffersTemplate(selectedOffers) {

  return mockOffers.map((offer) => selectedOffers.includes(offer.id) ? `<li class="event__offer">
  <span class="event__offer-title">${offer.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>
  </li>` : '').join('');
}

function createPointTemplate(point) {
  const {basePrice, dateFrom, dateTo, destination, offers, type} = point;

  const tripDate = humanizeTripDate(dateFrom); //'MMM DD';
  const timeFromTrip = humanizeTripTime(dateFrom); //'HH MM';
  const timeToTrip = humanizeTripTime(dateTo); //'HH MM';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${tripDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${createDestinationNameTemplate(destination)}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${timeFromTrip}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${timeToTrip}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${createOffersTemplate(offers)}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class TripPointView {

  constructor({point}) {
    this.point = point;
  }


  getTemplate() {
    return createPointTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
