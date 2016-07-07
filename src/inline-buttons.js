import { event } from 'd3-selection';
import TabButtons from './buttons';

export default class InlineTabButtons extends TabButtons {
  constructor(tab) {
    super(tab);

    this._root.styles({
      'align-items': 'center',
      'display': 'flex',
      'height': '3em',
      'justify-content': 'center',
      'order': 1,
      'position': 'relative',
      'width': '100%'
    });

    this._inner.styles({
      'border': '1px solid #007AFF',
      'border-radius': '0.3em',
      'color': '#007AFF',
      'display': 'flex',
      'height': '2em',
      'overflow': 'hidden'
    });
  }

  color(color) {
    if (typeof color === 'undefined') {
      return super.color();
    }

    this._inner.styles({
      'border-color': color,
      color
    });

    return super.color(color);
  }

  _handleSelect() {
    super._handleSelect();

    if (event.detail.button.selected() === true) {
      event.detail.button.root().styles({
        'background-color': this._color,
        'color': '#FFF'
      });
    }
  }
}
