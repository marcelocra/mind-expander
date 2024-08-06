import { html, render, useState } from "../deps/preact.js";
import en from "../i18n/en/translation.json" with { type: "json" };
import ptBr from "../i18n/pt-BR/translation.json" with { type: "json" };

/** TODO: use this to facilitate translations. */
const langs = { en, ptBr };
const lang = ptBr

/** @type {typeof lang} */
const t = lang;

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
