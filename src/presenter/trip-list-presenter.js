import { render , replace} from '../framework/render.js';
import TripListView from '../view/trip-list-view.js';
import ListSortView from '../view/list-sort-view.js';
import EditPointView from '../view/edit-point-view.js';
import TripPointView from '../view/point-view.js';
import ListEmptyView from '../view/trip-list-empty-view.js';
import { isEscape } from '../utils/common.js';

export default class TripListPresenter {
  #tripEventsContainer = null;
  #tripListComponent = new TripListView();
  #tripEmptyListComponent = new ListEmptyView();
  #pointsModel = null;

  constructor({tripEventsContainer, pointsModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    const listPoints = [...this.#pointsModel.points];

    const offersByType = [...this.#pointsModel.offersByType];

    const destinations = [...this.#pointsModel.destinations];

    if (listPoints.length) {

      render(new ListSortView(), this.#tripEventsContainer);

      render(this.#tripListComponent, this.#tripEventsContainer);

      for (let i = 0; i < listPoints.length; i++) {
        this.#renderTripPoint(listPoints[i], destinations, offersByType);
      }
    } else {
      render(this.#tripEmptyListComponent, this.#tripEventsContainer);
    }
  }

  #renderTripPoint(point, destinations, offersByType) {

    const editFormEscHandler = (evt) => {
      if (isEscape(evt)) {
        replaceEditToPoint.call(this);
      }
    };

    const pointComponent = new TripPointView ({
      point,
      destinations,
      offersByType,
      onPointClick: () => {
        replacePointToEdit.call(this);
        document.addEventListener('keydown', editFormEscHandler, {once : true});
      }
    });

    const editPointComponent = new EditPointView ({
      point,
      destinations,
      offersByType,
      onEditClick: () => {
        replaceEditToPoint.call(this);
      },
      onFormSubmit: () => {
        replaceEditToPoint.call(this);
      }
    });

    function replaceEditToPoint() {
      replace(pointComponent, editPointComponent);
    }

    function replacePointToEdit() {
      replace(editPointComponent, pointComponent);
    }

    render(pointComponent, this.#tripListComponent.element);
  }
}
