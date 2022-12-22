import { render } from '../render.js';
import TripListView from '../view/trip-list-view.js';
import ListSortView from '../view/list-sort-view.js';
import EditPointView from '../view/edit-point-view.js';
import TripPointView from '../view/point-view.js';
import AddNewPointView from '../view/add-new-point-view.js';

const POINTS_COUNT = 3;

export default class TripListPresenter {
  tripListComponent = new TripListView();

  constructor(tripEventsContainer) {
    this.tripEventsContainer = tripEventsContainer;
  }

  init() {
    render(new ListSortView(), this.tripEventsContainer);

    render(this.tripListComponent, this.tripEventsContainer);

    render(new EditPointView(), this.tripListComponent.getElement());
    render(new AddNewPointView(), this.tripListComponent.getElement());

    for (let i = 0; i < POINTS_COUNT; i++) {
      render(new TripPointView(), this.tripListComponent.getElement());
    }
  }
}
