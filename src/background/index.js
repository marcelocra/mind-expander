import { html, render } from "../deps-bundled.mjs";
import { contextMenuIds } from "../libs/constants.js";
import { t } from "../libs/i18n.js";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: contextMenuIds.highlight,
    title: t.contextMenu.title,
    type: "normal",
    contexts: ["selection"],
  });
});

// function Display() {
//   return html`
//     <div>
//       <h1>Hello, World!</h1>
//     </div>
//   `;
// }

// let displayRoot = document.createElement("div");
// displayRoot.id = "highlighter-root";
// render(html`<${Display} />`, displayRoot);

chrome.contextMenus.onClicked.addListener((item, tab) => {
  if (!tab || !tab.id || !tab.url || tab.url.includes("chrome://")) {
    return;
  }
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (
      /** @type {chrome.contextMenus.OnClickData} */ item,
      /** @type {chrome.tabs.Tab} */ tab,
      /** @type {any} */ stuff,
    ) => {
      let display = document.createElement("div");
      display.style.position = "absolute";
      display.style.top = "10px";
      display.style.right = "10px";
      display.style.zIndex = "999999";
      display.style.borderRadius = "4px";
      display.style.textWrap = "wrap";
      display.style.maxWidth = "35vw";
      display.style.maxHeight = "80vh";
      display.style.padding = "20px";
      display.style.overflow = "auto";
      display.style.overflowWrap = "break-word";
      display.style.backgroundColor = "white";
      display.style.border = "1px solid #e9e9e9";
      display.innerHTML = `
        <div style="font-weight: bold;">
          ${tab.url}
        </div>
        <br />
        <br />
        <div style="font-size: 14px">
          ${item.selectionText}
        </div>
      `;

      document.body.appendChild(display);
      setTimeout(() => {
        display.remove();
      }, 5000);
    },
    args: [item, tab, {}],
  });
});
