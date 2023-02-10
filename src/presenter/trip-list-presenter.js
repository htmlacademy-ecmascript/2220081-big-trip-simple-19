import { render } from '../framework/render.js';
import TripListView from '../view/trip-list-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/trip-list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { sortByDay, sortByPrice } from '../utils/point.js';
import { SortType } from '../const.js';


export default class TripListPresenter {
  #tripEventsContainer = null;
  #tripListComponent = new TripListView();
  #tripEmptyListComponent = new ListEmptyView();
  #sortComponent = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #points = [];
  #offersByType = [];
  #destinations = [];
  #pointPresenter = new Map();
  #sourcedPoints = [];
  #currentSortType = SortType.DAY;

  constructor({tripEventsContainer, pointsModel, offersModel, destinationsModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    this.#offersByType = [...this.#offersModel.offers];

    this.#destinations = [...this.#destinationsModel.destinations];

    this.#sourcedPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  }

  #renderBoard() {
    if (!this.#points.length) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.#sortPoints(this.#currentSortType);
    this.#renderPointList();
  }

  #sortPoints(sortType) {
    switch(sortType) {
      case SortType.DAY:
        this.#points.sort(sortByDay);
        break;
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatePoint) => {
    this.#points = updateItem(this.#points, updatePoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatePoint);
    this.#pointPresenter.get(updatePoint.id).init(updatePoint);
  };

  #renderEmptyList() {
    render(this.#tripEmptyListComponent, this.#tripEventsContainer);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripEventsContainer);
  }

  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderPointList() {
    render(this.#tripListComponent, this.#tripEventsContainer);
    this.#renderPoints();
  }

  #renderPoints() {
    this.#points
      .forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#tripListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
      destinations: this.#destinations,
      offersByType: this.#offersByType
    });

    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }
}
