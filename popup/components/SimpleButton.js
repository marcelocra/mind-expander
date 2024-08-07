import { html, render } from "../../libs/deps.js";
import { t } from "../../libs/i18n.js";

function App() {
  const buttonClass = "border rounded shadow-xl p-3 w-32";

  return html`
    <div class="flex flex-col items-center justify-center gap-3">
      <button class="${buttonClass}" onClick=${() => {}}>
        ${t.popupIcon.savePage}
      </button>
      <button class="${buttonClass}" onClick=${() => {}}>
        ${t.popupIcon.summarize}
      </button>
    </div>
  `;
}

render(html`<${App} />`, document.body);
