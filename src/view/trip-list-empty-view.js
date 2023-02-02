import AbstractView from '../framework/view/abstract-view.js';

function emptyListTemplate() {
  return'<p class="trip-events__msg">Click New Event to create your first point</p>';
}


export default class ListEmptyView extends AbstractView {

  get template() {
    return emptyListTemplate();
  }
}
