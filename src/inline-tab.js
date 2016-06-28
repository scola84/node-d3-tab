import Tab from './tab';
import Buttons from './inline-buttons';

export default class InlineTab extends Tab {
  constructor() {
    super();
    this._root.classed('inline', true);
  }

  destroy() {
    super.destroy();

    if (this._buttons) {
      this._buttons.destroy();
      this._buttons = null;
    }
  }

  buttons(action) {
    if (typeof action === 'undefined') {
      return this._buttons;
    }

    if (action === false) {
      this._buttons.destroy();
      this._buttons = null;

      return this;
    }

    this._buttons = new Buttons(this);

    this._root.node()
      .appendChild(this._buttons.root().node());

    return this;
  }
}
