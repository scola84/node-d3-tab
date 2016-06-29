import TabButton from './button';

export default class PanelTabButton extends TabButton {
  constructor() {
    super();

    this._root
      .styles({
        'cursor': 'pointer',
        'flex': '1 1 0',
        'text-align': 'center'
      })
      .on('click.scola-tab', this._handleClick.bind(this));

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
  }

  destroy() {
    this._root.on('click.scola-tab', null);
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
}
