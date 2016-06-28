import 'd3-selection-multi';

import InlineButton from './src/inline-button';
import InlineTab from './src/inline-tab';
import PanelButton from './src/panel-button';
import PanelTab from './src/panel-tab';

export function inlineButton() {
  return new InlineButton();
}

export function inlineTab() {
  return new InlineTab();
}

export function panelButton() {
  return new PanelButton();
}

export function panelTab() {
  return new PanelTab();
}
