import { event, select } from 'd3';
import { Observer } from '@scola/d3-model';
import { slider } from '@scola/d3-slider';

export default class Tab extends Observer {
  constructor() {
    super();

    this._tabs = new Map();
    this._slider = null;

    this._root = select('body')
      .append('div')
      .remove()
      .classed('scola tab', true)
      .styles({
        'display': 'flex',
        'flex-direction': 'column'
      });

    this._body = this._root
      .append('div')
      .classed('scola body', true)
      .styles({
        'flex': 1,
        'order': 2,
        'overflow': 'auto',
        'position': 'relative',
        '-webkit-overflow-scrolling': 'touch'
      });
  }

  destroy() {
    this._deleteSlider();

    this._root.dispatch('destroy');
    this._root.remove();
    this._root = null;
  }

  root() {
    return this._root;
  }

  buttons(action = true) {
    if (action === false) {
      return this._deleteButtons();
    }

    if (!this._buttons) {
      this._insertButtons();
    }

    return this._buttons;
  }

  slider(action = true) {
    if (action === false) {
      return this._deleteSlider();
    }

    if (!this._slider) {
      this._insertSlider();
    }

    return this._slider;
  }

  append(name, tab, action = true) {
    if (action === false) {
      return this._deleteTab(name, tab);
    }

    return this._insertTab(name, tab);
  }

  _insertButtons() {
    this._buttons = select('body')
      .append('div')
      .remove()
      .classed('scola buttons', true)
      .styles({
        'align-items': 'center',
        'display': 'flex',
        'height': '4em',
        'justify-content': 'center',
        'order': 1
      });

    this._root.node()
      .insertBefore(this._buttons.node(), this._body.node());
  }

  _deleteButtons() {
    if (this._buttons) {
      this._buttons.remove();
      this._buttons = null;
    }

    return this;
  }

  _insertSlider() {
    this._slider = slider()
      .duration(0);

    this._slider.root()
      .style('position', 'relative')
      .on('slide.scola-tab', () => this._slide());

    this._body
      .append(() => this._slider.root().node());

    return this;
  }

  _deleteSlider() {
    if (this._slider) {
      this._slider.root().on('slide.scola-tab', null);
      this._slider.destroy();
      this._slider = null;
    }

    return this;
  }

  _insertTab(name, tab) {
    this._tabs.set(name, tab);
    this.slider().append(tab);

    return tab;
  }

  _deleteTab(name, tab) {
    this._tabs.delete(name);
    this.slider().append(tab, false);

    return tab;
  }

  _set(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    if (this._tabs.has(setEvent.value)) {
      this.slider().toward(this._tabs.get(setEvent.value));
    }
  }

  _slide() {
    event.detail.forEach((tab) => {
      this._tabs.forEach((value, index) => {
        if (tab === value && this._model.get(this._name) !== index) {
          this._model.set(this._name, index);
        }
      });
    });
  }
}
