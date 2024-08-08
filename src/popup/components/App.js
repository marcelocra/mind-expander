import { t } from "../../libs/i18n.js";
import { html } from "../../vendored/htm-preact.js";

export function App() {
  const buttonClass =
    "border border-gray-300 w-full rounded px-3 py-1 shadow-xl text-sm text-nowrap hover:bg-gray-100";

  return html`
    <div class="flex flex-col items-center justify-center gap-3">
      <button class=${buttonClass} onClick=${() => alert("save")}>
        ${t.popupIcon.savePage}
      </button>
      <button class=${buttonClass} onClick=${() => alert("summarize")}>
        ${t.popupIcon.summarize}
      </button>
    </div>
  `;
}
