import { createElement } from '../render.js';

function emptyListTemplate() {
  return'<p class="trip-events__msg">Click New Event to create your first point</p>';
}


export default class ListEmptyView {
  #element = null;

  get template() {
    return emptyListTemplate();
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
