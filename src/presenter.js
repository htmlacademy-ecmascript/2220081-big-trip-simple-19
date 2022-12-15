import { render } from './render.js';

import TripListView from './view/trip-list-view.js';
import ListSortView from './view/list-sort-view.js';
import EditPointView from './view/edit-point-view.js';
import TripPointView from './view/trip-point-view.js';
import ListFiltersView from './view/filters-view.js';
import NewPointView from './view/new-point-view.js';

export default class TripPresenter {
  POINT_COUNT = 3;
  tripListComponent = new TripListView();
  constructor( {boardContainer, filterContainer} ) {
    this.boardContainer = boardContainer;
    this.filterContainer = filterContainer;
  }

  init() {
    render(new ListFiltersView(), this.filterContainer);
    render(new ListSortView(), this.boardContainer);
    render(this.tripListComponent, this.boardContainer);
    render(new EditPointView(), this.tripListComponent.getElement());
    render(new NewPointView(), this.tripListComponent.getElement());
    for (let i = 0; i < this.POINT_COUNT; i++) {
      render(new TripPointView(), this.tripListComponent.getElement());
    }
  }
}
