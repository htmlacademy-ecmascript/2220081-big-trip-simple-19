import { render } from './render.js';
import ListFiltersView from './view/list-filters-view.js';
import TripListPresenter from './presenter/trip-list-presenter.js';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripEventsContainerElement = document.querySelector('.trip-events');

const tripListPresenter = new TripListPresenter(tripEventsContainerElement);

render(new ListFiltersView(), filterContainerElement);

tripListPresenter.init();
