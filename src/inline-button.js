import TabButton from './button';

export default class InlineTabButton extends TabButton {
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
      });

    this._text = this._root
      .append('div')
      .classed('scola text', true)
      .styles({
        'font-size': '0.9em'
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

  text(text) {
    if (typeof text === 'undefined') {
      return this._text;
    }

    this._text
      .text(text);

    return this;
  }

  _bind() {
    this._root.on('click.scola-inline-tab-button',
      this._handleClick.bind(this));
  }

  _unbind() {
    this._root.on('click.scola-inline-tab-button', null);
  }
}
