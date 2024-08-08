import { html } from "../../deps-bundled.mjs";
import { t } from "../../libs/i18n.js";

/** @param {any} props */
function Button({ onClick, children }) {
  return html`
    <button
      class="btn btn-sm btn-primary btn-outline w-full text-nowrap rounded-sm shadow-md"
      onClick=${onClick}
    >
      ${children}
    </button>
  `;
}

export function Popup() {
  return html`
    <div class="flex flex-col items-center justify-center gap-3">
      <${Button} onClick=${() => alert("save")}>${t.popupIcon.savePage}<//>
      <${Button} onClick=${() => alert("summarize")}>
        ${t.popupIcon.summarize}
      <//>
    </div>
  `;
}
