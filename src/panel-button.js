import TabButton from './button';

export default class PanelTabButton extends TabButton {
  constructor() {
    super();

    this._root
      .styles({
        'cursor': 'pointer',
        'flex': 1,
        'text-align': 'center'
      });

    this._icon = this._root
      .append('div')
      .classed('scola icon', true)
      .styles({
        'font-size': '2em'
      });

    this._text = this._root
      .append('div')
      .classed('scola text', true)
      .styles({
        'font-size': '0.7em'
      });

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

  icon(name) {
    if (typeof name === 'undefined') {
      return this._icon;
    }

    this._icon.classed(name, true);
    return this;
  }

  text(text) {
    if (typeof text === 'undefined') {
      return this._text;
    }

    this._text.text(text);
    return this;
  }

  _bind() {
    this._root.on('click.scola-panel-tab-button',
      this._handleClick.bind(this));
  }

  _unbind() {
    this._root.on('click.scola-panel-tab-button', null);
  }
}
