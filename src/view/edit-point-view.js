import AbstractView from '../framework/view/abstract-view.js';
import { TIME_FULL_FORMAT, POINT_TYPES } from '../const.js';
import { humanizeFormatDate } from '../utils/point.js';
import { getDestinationById } from '../utils/destinations.js';
import { getTypeOffers } from '../utils/offers.js';

function createSelectTypeTemplate(currentType, pointId) {
  return `${
    POINT_TYPES.map((type) => `<div class="event__type-item">
    <input id="event-type-${type}-${pointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${pointId}">${type}</label>
  </div>`).join('')
  }`;
}

function selectDestinationListTemplate(destinations) {
  return destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');
}

function createOffersTemplate(pointOffers, offersByType, offerType, pointId) {
  const typeOffers = getTypeOffers(offersByType, offerType);
  return (typeOffers)
    ? typeOffers.offers.map(({id, title, price}) => {
      const checked = (pointOffers.includes(id)) ? 'checked' : '';
      return `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-${pointId}" type="checkbox" name="event-offer-${id}-${pointId}" ${checked}>
          <label class="event__offer-label" for="event-offer-${id}-${pointId}">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
        </div>
      `;
    }).join('')
    : '';
}

function createPhotosTemplate(destination) {
  const {pictures} = destination;
  if (!pictures.length) {
    return '';
  }

  const picturesTemplate = pictures.map((picture) => (`
    <img class="event__photo" src="${picture.src}" alt="${picture.description}">
  `)).join('');

  const template = `
    <div class="event__photos-container">
        <div class="event__photos-tape">
           ${picturesTemplate}
        </div>
    </div>
  `;

  return template;
}


function createEditPointTemplate(point, offersByType, destinations) {
  const {basePrice, dateFrom, dateTo, destination: destinationId, offers, type, id } = point;
  const destination = getDestinationById(destinations, destinationId);
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createSelectTypeTemplate(type, id)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}">
            <datalist id="destination-list-${id}">
              ${selectDestinationListTemplate(destinations)};
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${humanizeFormatDate(dateFrom, TIME_FULL_FORMAT)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${humanizeFormatDate(dateTo, TIME_FULL_FORMAT)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">${basePrice}</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
            ${createOffersTemplate(offers, offersByType, type, id)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>
            ${createPhotosTemplate(destination)}
          </section>
        </section>
      </form>
    </li>`
  );
}

export default class EditPointView extends AbstractView{
  #handleEditClick = null;
  #handleFormSubmit = null;
  #point = null;
  #offersByType = null;
  #destinations = null;

  constructor({point, destinations, offersByType, onEditClick, onFormSubmit}) {
    super();
    this.#point = point;
    this.#offersByType = offersByType;
    this.#destinations = destinations;
    this.#handleEditClick = onEditClick;
    this.#handleFormSubmit = onFormSubmit;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editToPointHandler);
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return createEditPointTemplate(this.#point, this.#offersByType, this.#destinations);
  }

  #editToPointHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#point);
  };
}
