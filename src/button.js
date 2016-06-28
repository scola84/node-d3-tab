import { select } from 'd3-selection';

export default class Button {
  constructor() {
    this._selected = false;

    this._root = select('body')
      .append('div')
      .classed('scola button', true);
  }

  destroy() {
    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  root() {
    return this._root;
  }

  selected(selected) {
    if (typeof selected === 'undefined') {
      return this._selected;
    }

    if (selected === this.selected) {
      return this;
    }

    this._selected = selected;

    this._root
      .classed('selected', selected)
      .dispatch('select', {
        detail: {
          button: this
        }
      });

    return this;
  }

  _handleClick() {
    if (this._selected === true) {
      return;
    }

    this.selected(true);
  }
}
