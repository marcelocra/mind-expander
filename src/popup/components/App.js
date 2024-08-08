import { t } from "../../libs/i18n.js";
import { html } from "../../vendored/htm-preact.js";

/** @param {any} props */
function Button({ onClick, children }) {
  return html`
    <button
      class="w-32 rounded border px-3 py-1 text-sm shadow-xl hover:bg-gray-100"
      onClick=${onClick}
    >
      ${children}
    </button>
  `;
}

export function App() {
  return html`
    <div class="flex flex-col items-center justify-center gap-3">
      <${Button} onClick=${() => alert("save")}>${t.popupIcon.savePage}<//>
      <${Button} onClick=${() => alert("summarize")}>
        ${t.popupIcon.summarize}
      <//>
    </div>
  `;
}
