import TabButton from './button';

export default class InlineTabButton extends TabButton {
  constructor() {
    super();

    this._first = null;

    this._root.styles({
      'align-items': 'center',
      'border-color': 'inherit',
      'color': 'inherit',
      'cursor': 'pointer',
      'display': 'flex',
      'flex': 1
    });

    this._border = this._root
      .append('div')
      .classed('scola border', true)
      .styles({
        'border-left-width': '1px',
        'border-left-style': 'solid',
        'border-left-color': 'inherit',
        'height': '100%',
        'order': 1,
        'width': 0
      });

    this._text = this._root
      .append('div')
      .classed('scola text', true)
      .styles({
        'flex': 1,
        'font-size': '0.9em',
        'order': 2,
        'text-align': 'center'
      });

    this.first(false);
    this._bind();
  }

  text(text) {
    if (typeof text === 'undefined') {
      return this._text;
    }

    this._text.text(text);
    return this;
  }

  first(first) {
    if (first === this._first) {
      return this;
    }

    this._first = first;
    this._border.style('display', first === true ? 'none' : 'inline');

    return this;
  }
}
