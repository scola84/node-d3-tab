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
