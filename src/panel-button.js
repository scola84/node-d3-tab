import TabButton from './button';

export default class PanelTabButton extends TabButton {
  constructor() {
    super();

    this._root.styles({
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

  icon(value) {
    if (typeof value === 'undefined') {
      return this._icon;
    }

    this._icon.classed(value, true);
    return this;
  }

  text(value) {
    if (typeof value === 'undefined') {
      return this._text;
    }

    this._text.text(value);
    return this;
  }
}
