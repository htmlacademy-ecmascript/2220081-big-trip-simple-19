import { render } from './render.js';
import ListFiltersView from './view/list-filters-view.js';
import TripListPresenter from './presenter/trip-list-presenter.js';
import PointsModel from './model/model.js';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const tripListPresenter = new TripListPresenter({
  tripEventsContainer: tripEventsContainerElement,
  pointsModel,
});

render(new ListFiltersView(), filterContainerElement);

tripListPresenter.init();
