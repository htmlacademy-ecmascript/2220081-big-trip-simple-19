import { render } from './render.js';
import FiltersView from './view/filter-view.js';
import TripListPresenter from './presenter/trip-list-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import { generateFilter } from './mock/filters.js';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const tripListPresenter = new TripListPresenter({
  tripEventsContainer: tripEventsContainerElement,
  pointsModel,
  destinationsModel,
  offersModel
});

const filters = generateFilter(pointsModel.points);

render(new FiltersView({filters}), filterContainerElement);

tripListPresenter.init();
