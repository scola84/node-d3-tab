import { event, select } from 'd3-selection';
import { slider } from '@scola/d3-slider';
import 'd3-selection-multi';

export default class Tab {
  constructor() {
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

    this._inner = this._root
      .append('div')
      .classed('scola inner', true)
      .styles({
        'flex': 1,
        'order': 2,
        'overflow': 'auto',
        'position': 'relative',
        '-webkit-overflow-scrolling': 'touch'
      });

    this._handleModelSet = (e) => this._modelSet(e);
  }

  destroy() {
    if (this._slider) {
      this._slider.root().on('slide.scola-tab', null);
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

  model(value) {
    this._model = value;
    this._bindModel();

    return this;
  }

  name(itemName) {
    this._name = itemName;
    return this;
  }

  buttons() {
    if (!this._buttons) {
      this._insertButtons();
    }

    return this._buttons;
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

    this._slider.root()
      .style('position', 'relative')
      .on('slide.scola-tab', () => this._handleSlide());

    this._inner.node()
      .appendChild(this._slider.root().node());

    return this;
  }

  append(name, tab, action) {
    if (action === true) {
      this._tabs.set(name, tab);
      this._slider.append(tab);
    } else if (action === false) {
      this._tabs.delete(name);
    }

    return this;
  }

  _bindModel() {
    this._model.setMaxListeners(this._model.getMaxListeners() + 1);
    this._model.addListener('set', this._handleModelSet);
  }

  _unbindModel() {
    this._model.setMaxListeners(this._model.getMaxListeners() - 1);
    this._model.removeListener('set', this._handleModelSet);
  }

  _insertButtons() {
    this._buttons = this._root
      .append('div')
      .classed('scola buttons', true)
      .styles({
        'align-items': 'center',
        'display': 'flex',
        'height': '4em',
        'justify-content': 'center',
        'order': 1
      });
  }

  _modelSet(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    if (this._tabs.has(setEvent.value)) {
      this._slider.toward(this._tabs.get(setEvent.value));
    }
  }

  _handleSlide() {
    event.detail.forEach((tab) => {
      this._tabs.forEach((value, index) => {
        if (tab === value && this._model.get(this._name) !== index) {
          this._model.set(this._name, index);
        }
      });
    });
  }
}
