import { event, select } from 'd3-selection';
import { slider } from '@scola/d3-slider';

export default class Tab {
  constructor() {
    this._selected = [];
    this._tabs = [];

    this._buttons = null;
    this._slider = null;

    this._root = select('body')
      .append('div')
      .classed('scola tab', true)
      .styles({
        'display': 'flex',
        'flex-direction': 'column',
        'height': '100%',
        'position': 'absolute',
        'width': '100%'
      });

    this._inner = this._root
      .append('div')
      .classed('scola inner', true)
      .styles({
        'flex-grow': 1,
        'order': 2,
        'width': '100%'
      });
  }

  destroy() {
    if (this._buttons) {
      this._buttons.destroy();
      this._buttons = null;
    }

    if (this._slider) {
      this._slider.destroy();
      this._slider = null;
    }

    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  root() {
    return this._root;
  }

  buttons() {
    throw new Error('Not implemented');
  }

  slider(action) {
    if (typeof action === 'undefined') {
      return this._slider;
    }

    if (action === false) {
      this._slider.destroy();
      this._slider = null;

      return this;
    }

    this._slider = slider()
      .duration(0);

    this._inner.node()
      .appendChild(this._slider.root().node());

    this._slider.root().on('slide', this._handleSlide.bind(this));

    return this;
  }

  append(tab) {
    this._tabs.push(tab);
    this._slider.append(tab);

    return this;
  }

  select(index) {
    if (this._selected.indexOf(index) !== -1) {
      return;
    }

    this._slider.toward(this._tabs[index]);
  }

  _handleSlide() {
    if (this._selected.length > 0) {
      this._selected.forEach((index) => {
        this._buttons.index(index).selected(false);
      });

      this._selected = [];
    }

    event.detail.forEach((tab) => {
      const index = this._tabs.indexOf(tab);
      this._selected.push(index);
      this._buttons.index(index).selected(true);
    });
  }
}
