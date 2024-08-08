import { POPUP_MODE, STORAGE_KEYS, contextMenuIds } from "../libs/constants.js";
import { debug } from "../libs/debug.js";
import { t } from "../libs/i18n.js";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: contextMenuIds.highlight,
    title: t.contextMenu.title,
    type: "normal",
    contexts: ["selection"],
  });
});

debug("bg: Registering context menu listener...");
chrome.contextMenus.onClicked.addListener(async (item, tab) => {
  if (!tab || !tab.id || !tab.url || tab.url.includes("chrome://")) {
    return;
  }
  await chrome.storage.sync.set({
    [STORAGE_KEYS.POPUP_MODE]: POPUP_MODE.SHOW_SAVED_HIGHLIGHTS,
    [STORAGE_KEYS.HIGHLIGHT_ITEM]: item,
    [STORAGE_KEYS.HIGHLIGHT_TAB]: tab,
  });

  await chrome.action.openPopup();

  await chrome.storage.sync.set({
    [STORAGE_KEYS.POPUP_MODE]: POPUP_MODE.DEFAULT,
  });
});
debug("bg: Done.");
