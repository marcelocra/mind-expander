import { html, render } from "../deps-bundled.mjs";
import { POPUP_MODE, STORAGE_KEYS } from "../libs/constants.js";
import { Popup } from "./components/Popup.js";
import { PopupWithHighlight } from "./components/PopupWithHighlight.js";

const { [STORAGE_KEYS.POPUP_MODE]: popupMode } = await chrome.storage.sync.get(
  STORAGE_KEYS.POPUP_MODE,
);

switch (popupMode) {
  case POPUP_MODE.SHOW_SAVED_HIGHLIGHTS:
    const {
      [STORAGE_KEYS.HIGHLIGHT_ITEM]: highlightItem,
      [STORAGE_KEYS.HIGHLIGHT_TAB]: highlightTab,
    } = await chrome.storage.sync.get([
      [STORAGE_KEYS.HIGHLIGHT_ITEM],
      [STORAGE_KEYS.HIGHLIGHT_TAB],
    ]);

    render(
      html`<${PopupWithHighlight} ${highlightItem} ${highlightTab} />`,
      document.body,
    );
    break;

  case POPUP_MODE.DEFAULT:
  default:
    render(html`<${Popup} />`, document.body);
    break;
}
