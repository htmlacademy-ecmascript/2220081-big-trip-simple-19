import { render } from './render.js';
import FiltersView from './view/filter-view.js';
import TripListPresenter from './presenter/trip-list-presenter.js';
import PointsModel from './model/points-model.js';
import { generateFilter } from './mock/filters.js';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const tripListPresenter = new TripListPresenter({
  tripEventsContainer: tripEventsContainerElement,
  pointsModel,
});

const filters = generateFilter(pointsModel.points);

render(new FiltersView({filters}), filterContainerElement);

tripListPresenter.init();
