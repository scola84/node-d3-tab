import { event, select } from 'd3-selection';

export default class TabButtons {
  constructor(tab) {
    this._tab = tab;
    this._buttons = [];
    this._color = '#007AFF';

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola buttons', true);

    this._inner = this._root
      .append('div')
      .classed('scola inner', true);
  }

  destroy() {
    this._buttons.forEach((button) => this._unbindButton(button));
    this._buttons = [];

    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  root() {
    return this._root;
  }

  inner() {
    return this._inner;
  }

  color(value) {
    if (typeof value === 'undefined') {
      return this._color;
    }

    this._color = value;
    return this;
  }

  append(button) {
    this._buttons.push(button);
    this._inner.node().appendChild(button.root().node());
    this._bindButton(button);
  }

  index(value) {
    if (typeof value === 'number') {
      return this._buttons[value];
    }

    return this._buttons.indexOf(value);
  }

  _bindButton(button) {
    button.root().on('select.scola-tab-buttons', () => this._handleSelect());
  }

  _unbindButton(button) {
    button.root().on('select.scola-tab-buttons', null);
  }

  _handleSelect() {
    if (event.detail.button.selected() === false) {
      event.detail.button.root().styles({
        'background-color': 'inherit',
        'color': 'inherit'
      });

      return;
    }

    const index = this._buttons.indexOf(event.detail.button);
    this._tab.select(index);
  }
}
