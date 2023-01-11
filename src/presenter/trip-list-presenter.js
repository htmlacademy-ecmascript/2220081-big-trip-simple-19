import { render, RenderPosition } from '../render.js';
import TripListView from '../view/trip-list-view.js';
import ListSortView from '../view/list-sort-view.js';
import EditPointView from '../view/edit-point-view.js';
import TripPointView from '../view/point-view.js';
import AddNewPointView from '../view/add-new-point-view.js';

export default class TripListPresenter {
  tripListComponent = new TripListView();

  constructor({tripEventsContainer, pointsModel}) {
    this.tripEventsContainer = tripEventsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.listPoints = [...this.pointsModel.getPoints()];

    render(new ListSortView(), this.tripEventsContainer);

    render(this.tripListComponent, this.tripEventsContainer);

    render(new AddNewPointView(), this.tripListComponent.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 0; i < this.listPoints.length; i++) {
      render(new TripPointView({point: this.listPoints[i]}), this.tripListComponent.getElement());
    }
    render(new EditPointView(this.listPoints[0]), this.tripListComponent.getElement(), RenderPosition.AFTERBEGIN);
  }
}
