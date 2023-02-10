import { render, replace, remove} from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import TripPointView from '../view/point-view.js';
import { isEscape } from '../utils/common.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #offersByType = null;
  #destinations = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, onDataChange, onModeChange, offersByType, destinations}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#offersByType = offersByType;
    this.#destinations = destinations;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new TripPointView({
      point: this.#point,
      destinations: this.#destinations,
      offersByType: this.#offersByType,
      onPointClick: this.#handlePointClick
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      destinations: this.#destinations,
      offersByType: this.#offersByType,
      onEditClick:  this.#handleEditClick,
      onFormSubmit: this.#handleFormSubmit,
    });

    if(prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if(this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }
    if(this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#replaceEditToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #handleEditClick = () => {
    this.#replaceEditToPoint();
  };

  #handlePointClick = () => {
    this.#replacePointToEdit();
    document.addEventListener('keydown', this.#editFormEscHandler);
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceEditToPoint();
  };

  #replaceEditToPoint () {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#editFormEscHandler);
    this.#mode = Mode.DEFAULT;
  }

  #replacePointToEdit() {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #editFormEscHandler = (evt) => {
    if (isEscape(evt)) {
      this.#replaceEditToPoint();
    }
  };
}
