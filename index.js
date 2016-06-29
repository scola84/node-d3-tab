import InlineTab from './src/inline-tab';
import InlineTabButton from './src/inline-button';
import PanelTab from './src/panel-tab';
import PanelTabButton from './src/panel-button';

export function inlineTab() {
  return new InlineTab();
}

export function inlineTabButton() {
  return new InlineTabButton();
}

export function panelTab() {
  return new PanelTab();
}

export function panelTabButton() {
  return new PanelTabButton();
}
