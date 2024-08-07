import { html, render } from "../libs/deps.js";
import { t } from "../libs/i18n.js";
import { SimpleButton } from "./components/SimpleButton.js";

function App() {
  return html`
    <div class="flex flex-col items-center justify-center gap-3">
      <${SimpleButton} onClick=${() => {
        alert("save");
      }}>
        ${t.popupIcon.savePage}
      </>
      <${SimpleButton} onclick=${() => {
        alert("summarize");
      }}>
        ${t.popupIcon.summarize}
      </>
    </div>
  `;
}

render(html`<${App} />`, document.body);
