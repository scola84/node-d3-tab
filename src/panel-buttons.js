import { event } from 'd3-selection';
import TabButtons from './buttons';
import 'd3-selection-multi';

export default class PanelTabButtons extends TabButtons {
  constructor(tab) {
    super(tab);

    this._root.styles({
      'background': '#FAFAFA',
      'border-top': '1px solid #CCC',
      'color': '#777',
      'display': 'flex',
      'height': '3em',
      'justify-content': 'center',
      'order': 3
    });

    this._inner.styles({
      'display': 'flex',
      'width': '100%'
    });
  }

  _handleSelect() {
    super._handleSelect();

    if (event.detail.button.selected() === true) {
      event.detail.button.root().styles({
        'color': this._color
      });
    }
  }
}
