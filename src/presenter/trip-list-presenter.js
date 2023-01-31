import { render } from '../render.js';
import TripListView from '../view/trip-list-view.js';
import ListSortView from '../view/list-sort-view.js';
import EditPointView from '../view/edit-point-view.js';
import TripPointView from '../view/point-view.js';
import { isEscape } from '../utils.js';

export default class TripListPresenter {
  #tripEventsContainer = null;
  #tripListComponent = new TripListView();
  #pointsModel = null;

  constructor({tripEventsContainer, pointsModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    const listPoints = [...this.#pointsModel.points];

    const offersByType = [...this.#pointsModel.offersByType];

    const destinations = [...this.#pointsModel.destinations];

    render(new ListSortView(), this.#tripEventsContainer);

    render(this.#tripListComponent, this.#tripEventsContainer);

    for (let i = 0; i < listPoints.length; i++) {
      this.#renderTripPoint(listPoints[i], destinations, offersByType);
    }
  }

  #renderTripPoint(point, destinations, offersByType) {

    const pointComponent = new TripPointView(point, destinations, offersByType);
    const editPointComponent = new EditPointView(point, destinations, offersByType);

    const replaceEditToPoint = () => {
      this.#tripListComponent.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    const replacePointToEdit = () => {
      this.#tripListComponent.element.replaceChild(editPointComponent.element, pointComponent.element);
      editPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', replaceEditToPoint, {once : true});
      editPointComponent.element.querySelector('form').addEventListener('submit', editFormSubmitHandler, {once : true});
      document.addEventListener('keydown', editFormEscHandler, {once : true});
    };

    function editFormEscHandler(evt) {
      if (isEscape(evt)) {
        replaceEditToPoint();
      }
    }

    function editFormSubmitHandler(evt) {
      evt.preventDefault();
      replaceEditToPoint();
    }

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', replacePointToEdit);

    render(pointComponent, this.#tripListComponent.element);

  }

}
