import { select } from 'd3-selection';

export default class TabButton {
  constructor() {
    this._selected = false;

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola button', true);

    this._bind();
  }

  destroy() {
    this._unbind();
    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  root() {
    return this._root;
  }

  selected(value) {
    if (typeof value === 'undefined') {
      return this._selected;
    }

    if (value === this.selected) {
      return this;
    }

    this._selected = value;

    this._root
      .classed('selected', value)
      .dispatch('select', {
        detail: {
          button: this
        }
      });

    return this;
  }

  _bind() {
    this._root.on('click.scola-inline-tab-button', () => this._handleClick());
  }

  _unbind() {
    this._root.on('click.scola-inline-tab-button', null);
  }

  _handleClick() {
    if (this._selected === true) {
      return;
    }

    this.selected(true);
  }
}
