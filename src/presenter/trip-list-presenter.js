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
    const listPoints = [...this.pointsModel.getPoints()];

    const offersByType = [...this.pointsModel.getOffersByType()];

    const destinations = [...this.pointsModel.getDestinations()];

    render(new ListSortView(), this.tripEventsContainer);

    render(this.tripListComponent, this.tripEventsContainer);

    render(new AddNewPointView(offersByType, destinations), this.tripListComponent.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 0; i < listPoints.length; i++) {
      render(new TripPointView(listPoints[i], destinations, offersByType), this.tripListComponent.getElement());
    }
    render(new EditPointView(listPoints[0], offersByType, destinations), this.tripListComponent.getElement(), RenderPosition.AFTERBEGIN);
  }
}
