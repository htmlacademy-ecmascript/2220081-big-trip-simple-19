import { createElement } from '../render.js';

function loadingTemplate() {
  return '<p class="trip-events__msg">Loading...</p>';
}

export default class LoadingView {
  #element = null;
  get template() {
    return loadingTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

