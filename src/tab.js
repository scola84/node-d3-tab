import { select } from 'd3';
import { Observer } from '@scola/d3-model';

export default class Tab extends Observer {
  constructor() {
    super();

    this._tabs = new Map();
    this._buttons = null;

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
      .classed('scola body', true);
  }

  destroy() {
    super.destroy();

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

    if (this._buttons === null) {
      this._insertButtons();
    }

    return this._buttons;
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
        'justify-content': 'center'
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

  _insertTab(name, tab) {
    this._tabs.set(name, tab);

    tab.root().style('display', () => {
      return this._tabs.size === 1 ? null : 'none';
    });

    this._body.append(() => tab.root().node());

    if (this._tabs.size === 1) {
      this._model.set(this._name, name);
    }

    return tab;
  }

  _deleteTab(name, tab) {
    this._tabs.delete(name);
    tab.root().remove();

    return tab;
  }

  _set(setEvent) {
    if (setEvent.name !== this._name) {
      return;
    }

    this._tabs.forEach((tab, name) => {
      tab.root().styles(() => {
        return name === setEvent.value ? {
          'display': null
        } : {
          'display': 'none'
        };
      });
    });
  }
}
