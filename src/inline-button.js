import Button from './button';

export default class PanelButton extends Button {
  constructor() {
    super();

    this._root
      .styles({
        'align-items': 'center',
        'border-left': '1px solid inherit',
        'color': 'inherit',
        'cursor': 'pointer',
        'display': 'flex',
        'flex': '1 1 0',
        'justify-content': 'center'
      })
      .on('click.scola-tab', this._handleClick.bind(this));

    this._text = this._root
      .append('div')
      .classed('scola text', true)
      .styles({
        'font-size': '0.9em'
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

  text(text) {
    if (typeof text === 'undefined') {
      return this._text;
    }

    this._text
      .text(text);

    return this;
  }
}
